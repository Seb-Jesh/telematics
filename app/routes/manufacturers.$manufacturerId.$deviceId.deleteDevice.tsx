import { useNavigate } from "@remix-run/react";
import { redirect, MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import Modal from "~/components/util/modal";
import invariant from "tiny-invariant";
import { deleteDevice } from "~/models/manufacturer.server";
import DeleteItem from "~/components/forms/deleteConfirm";

export const meta: MetaFunction = () => {
  return [
    { title: "Delete Device" },
    { name: "description", content: "Delete Device" },
  ];
};

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.deviceId, "deviceId not found");  
  const deviceId = params.deviceId; 
    await deleteDevice({ id: deviceId });
    return redirect("../..");
};

export default function DeleteDevice() {
  const navigate = useNavigate()
  const message = "Confirm delete Device"

  function closeModalHandler() {
    navigate("..")
  }
    return (
        <Modal onClose={closeModalHandler}>
            <DeleteItem message={message} />
        </Modal>
    )
}