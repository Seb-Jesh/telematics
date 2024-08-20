import { useMatches, useNavigate, useParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import AddDevice from "~/components/forms/AddDevice";
import Modal from "~/components/util/modal";
import { updateDevice } from "~/models/manufacturer.server";
import invariant from "tiny-invariant";

export const meta = () => {
  return [
    { title: "Edit Device" },
    { name: "description", content: "Edit Device details" },
  ];
};

export const action = async ({ params, request }) => {
  const formData = await request.formData()
  invariant(params.deviceId, "deviceId not found");
  const id = params.deviceId
  const model = formData.get("model");
  const sn = formData.get("sn");
  const imei = formData.get("imei");
  // Add validation
  if (typeof model !== "string" || model.length === 0) {
    return json({ errors: { model: "Model is required", sn: null, imei: null } }, { status: 400 });
  }
  // if (typeof sn !== "string" || sn.length === 0) {
  //   return json({ errors: { model: null, sn: "Serial Number is required", imei: null } }, { status: 400 });
  // }
  // if (typeof imei !== "string" || imei.length === 0) {
  //   return json({ errors: { model: null, sn: null, imei: "IMEI is required" } }, { status: 400 });
  // }
  await updateDevice({id, model, sn, imei})
  return redirect("..")
};

export default function EditDevice() {
  const navigate = useNavigate();
  const params = useParams()
  const matches = useMatches();
  const devices = matches.find(match => match.id === "routes/manufacturers.$manufacturerId");
  const devicesData = devices?.data
  const formData = devicesData.find((device) => device.id = params.deviceId);

  function closeModalHandler() {
    navigate("..")
  }
    return (
        <Modal onClose={closeModalHandler}>
            <AddDevice formData={formData} />
        </Modal>
    )
}