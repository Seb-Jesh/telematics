import { useLoaderData, useNavigate } from "@remix-run/react";
import { json, redirect, MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import LinkSIM from "~/components/forms/LinkSIM";
import Modal from "~/components/util/modal";
import { getUnlinkedSims } from "~/models/provider.server";
import { AddSimToDevice } from "~/models/provider.server";
import invariant from "tiny-invariant";
import { RemoveSimFromDevice, getDeviceById } from "~/models/manufacturer.server";
import UnlinkSIM from "~/components/forms/UnlinkSim";

export const meta: MetaFunction = () => {
  return [
    { title: "Link SIM" },
    { name: "description", content: "Link SIM to Device" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.deviceId, "deviceId not found");
  const sims = await getUnlinkedSims();
  const simOptions = sims.map(sim => sim.msisdn)
  const deviceId = params.deviceId
  const device = await getDeviceById({id: deviceId})
  return json({simOptions, device})
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.deviceId, "deviceId not found");
  const formData = await request.formData()
  const deviceId = params.deviceId;
  if (formData.has("simid")) {
    const msisdn = formData.get("simid");
    if (typeof msisdn !== "string" || msisdn.length === 0) {
      return json(
        { errors: { msisdn: "MSISDN is required" } },
        { status: 400 }
      );
    }
    await AddSimToDevice({ deviceId, msisdn });
    return redirect("..");
  }
  await RemoveSimFromDevice({id: deviceId})
  
  return redirect("..")
};

export default function LinkSIMToDevice() {
  const navigate = useNavigate()
  const {simOptions} = useLoaderData<typeof loader>();
  const {device} = useLoaderData<typeof loader>();

  function closeModalHandler() {
    navigate("..")
  }
    return (
        <Modal onClose={closeModalHandler}>
            {device?.sim?.msisdn ? <UnlinkSIM /> : <LinkSIM simOptions={simOptions} />}
        </Modal>
    )
}