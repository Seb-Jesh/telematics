import type { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, useMatches, useParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import NewUnit from "~/components/forms/NewUnit";
import Modal from "~/components/util/modal";
import { getUnit, getPlatforms, getClient, getPlatformByTitle, updateUnit } from "~/models/platform.server";
import { getUnlinkedDevices } from "~/models/manufacturer.server";
import invariant from "tiny-invariant";

export const meta = () => {
  return [
    { title: "Edit Unit" },
    { name: "description", content: "Edit Unit details" },
  ];
};

export const loader = async () => {
  const platforms = await getPlatforms();
  const platformOptions= platforms.map(platform => platform.title)

  const devices = await getUnlinkedDevices();
  const deviceOptions = devices.map(device => device.imei)
  
  return json({deviceOptions, platformOptions})
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  invariant(params.unitId, "unitId not found");
  const unitId = params.unitId
  const unit = await getUnit({regMark: unitId});

  const id = unit?.id as number;
  const regMark = formData.get("regMark");
  const brand = formData.get("brand");
  const model = formData.get("model") as string;
  const yom = formData.get("yom") as string;
  const vin = formData.get("vin") as string;
  const engine = formData.get("engine") as string;

  const name = formData.get("client") as string;
  const client = await getClient({name});
  const clientId = client?.id;

  const deviceImei = formData.get("device") as string;

  const title = formData.get("platform") as string;
  const platform = await getPlatformByTitle({title});
  const platformId = platform?.id as number;

  // Add validation
  if (typeof regMark !== "string" || regMark.length === 0) {
    return json({ errors: { regMark: "RegMark is required", brand: null, model: null, yom: null, vin: null, engine: null, name: null } }, { status: 400 });
  }
  if (typeof brand !== "string" || brand.length === 0) {
    return json({ errors: { regMark: null, brand: "Brand Number is required", model: null, yom: null, vin: null, engine: null, name: null } }, { status: 400 });
  }
  if (name === "Please select" || typeof clientId !== "number") {
    return json({ errors: { regMark: null, brand: null, model: null, yom: null, vin: null, engine: null, name: "Client is required" } }, { status: 400 });
  }
  // if (typeof model !== "string" || model.length === 0) {
  //   return json({ errors: { regMark: null, brand: null, model: "Model is required", yom: null, vin: null, engine: null } }, { status: 400 });
  // }
  // if (typeof vin !== "string" || vin.length === 0) {
  //   return json({ errors: { regMark: null, brand: null, model: null, yom: null, vin: "VIN is required", engine: null } }, { status: 400 });
  // }
  // if (typeof engine !== "string" || engine.length === 0) {
  //   return json({ errors: { regMark: null, brand: null, model: null, yom: null, vin: null, engine: "Engine # is required" } }, { status: 400 });
  // }
  await updateUnit({id, regMark, brand, model, yom, vin, engine, clientId, deviceImei, platformId})
  
  return redirect("../..")
};

export default function EditDevice() {
  const params = useParams();
  const matches = useMatches();
  const clientRoute = matches.find((match) => match.id === 'routes/clients')// @ts-ignore
  const clientsArray = clientRoute?.data?.clients
  const client = clientsArray.find((item: any) => item.name === params.clientId)
  const units = client.units
  const unit = units.find((item: any) => item.regMark === params.unitId)
  const clientOptions = clientsArray.map((client: any) => client.name)
  const navigate = useNavigate()
  // const data = useLoaderData;
  // console.log(clients)
  const {deviceOptions, platformOptions} = useLoaderData<typeof loader>();
  // console.log(platformOptions)
  const formData = {
    regMark: unit.regMark,
    brand: unit.brand,
    model: unit.model,
    yom: unit.yom,
    vin: unit.vin,
    engine: unit.engine,
    clientId: unit.client.name,
    deviceImei: unit.device.imei,
    platformId: unit.platform.title,
  }

  function closeModalHandler() {
    navigate("..")
  }
    return (
      <Modal onClose={closeModalHandler}>
        <NewUnit
          formData={formData}
          clientOptions={clientOptions}
          deviceOptions={deviceOptions}
          platformOptions={platformOptions}
        />
      </Modal>
    );
}