import type { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import AddDevice from "~/components/forms/AddDevice"
// import { getStoredDevices, getStoredManufacturers, storeDevices } from "~/data/store"
import { createDevice, getManufacturer, getManufacturers } from "~/models/manufacturer.server";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import newDeviceStyles from "~/components/forms/InputForm.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: newDeviceStyles },
  ];

export const meta: MetaFunction = () => {
    return [
      { title: "Add Device" },
      { name: "description", content: "Add a GPS Device" },
    ];
  };

  // interface Manufacturer {
  //   maker: string
  //   url: string
  //   id: number
  // }

  export async function loader() {
    // const manufacturers: Manufacturer[] = await getStoredManufacturers();
    const manufacturers = await getManufacturers();
    const manufacturerOptions= manufacturers.map(manufacturer => manufacturer.maker)

    return json({manufacturerOptions})
  }

// export const action = async ({ request }: ActionFunctionArgs) => {
//     const formData = await request.formData()
//     const deviceData = Object.fromEntries(formData) 
//     // Add validation
//     const existingDevices = await getStoredDevices() 
//     deviceData.id = new Date().toISOString()
//     const updatedDevices = existingDevices.concat(deviceData)
//     await storeDevices(updatedDevices)
//     return redirect("/manufacturers")
//   };

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const model = formData.get("model") as string
    const sn = formData.get("sn") as string
    const imei = formData.get("imei") as string
    const maker = formData.get("maker") as string;
    const manufacturer = await getManufacturer({maker});
    const manufacturerId = manufacturer?.id as number;
    // Add validation
    if (typeof model !== "string" || model === "Please select") {
      return json({ errors: { model: "Model is required", sn: null, imei: null, maker: null } }, { status: 400 });
    }

    await createDevice({model, sn, imei, manufacturerId})
    return redirect("/manufacturers")
  };

export default function DeviceForm() {
  const {manufacturerOptions} = useLoaderData<typeof loader>()
    return (
        <main>
            <h1>Add GPS Device Form</h1>
            <AddDevice manufacturerOptions={manufacturerOptions} />
        </main>
    )
}