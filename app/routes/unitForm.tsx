import type { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import NewUnit from "~/components/forms/NewUnit"
import type { MetaFunction, LinksFunction } from "@remix-run/node";
// import { getStoredUnits, getStoredClients, getStoredDevices, getStoredPlatforms, linkDevices, storeUnits, linkUnits } from "~/data/store"
import newUnitStyles from "~/components/forms/InputForm.css";
import { getPlatforms, getClient, getClients, createUnit, getPlatformByTitle } from "~/models/platform.server";
import { getUnlinkedDevices, getDevices } from "~/models/manufacturer.server";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: newUnitStyles },
  ];

export const meta: MetaFunction = () => {
    return [
      { title: "Add Unit" },
      { name: "description", content: "Add a Unit Form" },
    ];
  };

  // interface Client {
  //   title: string
  //   contact: string
  //   msisdn: string
  //   id: string
  // }

  // interface Device {
  //   title: string
  //   imei: string
  //   unit: string
  // }


  // interface Platform {
  //   title: string
  //   url: string
  //   cost: string
  //   id: string
  // }

  // interface Sim {
  //   title: string
  //   iccid: string
  //   msisdn: string
  //   unit: string
  // }

// export async function loader() {
//     const platforms: Platform[] = await getStoredPlatforms();
//     const platformOptions= platforms.map(platform => platform.title)

//     const clients: Client[] = await getStoredClients();
//     const clientOptions = clients.map(client => client.title)

//     const linkeddevices: Device[] = await linkDevices();
//     const selectDevices = linkeddevices.filter(device => device.unit === undefined)
//     const deviceOptions = selectDevices.map(device => device.imei)

//     const linkedsims: Sim[] = await linkUnits();
//     const selectSims = linkedsims.filter(sim => sim.unit === undefined)
//     const simOptions = selectSims.map(sim => sim.msisdn)

//     return json({clientOptions, deviceOptions, platformOptions, simOptions})
//   }

  export async function loader() {
    const platforms = await getPlatforms();
    const platformOptions= platforms.map(platform => platform.title)

    const clients = await getClients();
    const clientOptions = clients.map(client => client.name)

    const devices = await getUnlinkedDevices();
    const deviceOptions = devices.map(device => device.imei)

    return json({clientOptions, deviceOptions, platformOptions})
  }

// export const action = async ({ request }: ActionFunctionArgs) => {
//     const formData = await request.formData()
//     const unitData = Object.fromEntries(formData) 
//     // Add validation
//     const title = unitData.title
//     if (typeof title !== "string" || title.length < 5) {
//         return { message: "Title is required" };
//       }

//     const existingUnits = await getStoredUnits() 
//     unitData.id = new Date().toISOString()
//     const updatedUnits = existingUnits.concat(unitData)
//     await storeUnits(updatedUnits)
//     return redirect("/units")
//   };

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const regMark = formData.get("regMark");
    const brand = formData.get("brand");
    
    const model = formData.get("model") as string;
    const yom = formData.get("yom") as string;
    const vin = formData.get("vin") as string;
    const engine = formData.get("engine") as string;

    const name = formData.get("client") as string;
    const client = await getClient({name});
    const clientId = client?.id as number;

    const deviceImei = formData.get("device") as string;

    const title = formData.get("platform") as string;
    const platform = await getPlatformByTitle({title});
    const platformId = platform?.id as number;

    // Add validation
    if (typeof regMark !== "string" || regMark.length === 0) {
        return { message: "Reg Mark is required" };
      }
    if (typeof brand !== "string" || brand.length === 0) {
        return { message: "Brand is required" };
      }
    if (name === "Please select") {
      return { message: "Select a client from the list" };
    }
    if (deviceImei === "Please select") {
      return { message: "Select a device from the list" };
    } 
    if (title === "Please select") {
      return { message: "Select a platform from the list" };
    }     
    
    await createUnit({ regMark, brand, model, yom, vin, engine, clientId, deviceImei, platformId })
    return redirect("/clients")
  };

export default function UnitForm() {
    const {clientOptions, deviceOptions, platformOptions} = useLoaderData<typeof loader>()
    
    return (
      <main>
        <h1>Add Unit Form</h1>
        <NewUnit
          clientOptions={clientOptions}
          platformOptions={platformOptions}
          deviceOptions={deviceOptions}
        />
      </main>
    );
}