import { useNavigate } from "@remix-run/react";
import { redirect, MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import Modal from "~/components/util/modal";
import invariant from "tiny-invariant";
import { deleteSim } from "~/models/provider.server";
import DeleteItem from "~/components/forms/deleteConfirm";

export const meta: MetaFunction = () => {
  return [
    { title: "Delete Device" },
    { name: "description", content: "Delete Device" },
  ];
};

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.simId, "simId not found");  
  const simId = params.simId; 
    await deleteSim({ id: simId });
    return redirect("../..");
};

export default function DeleteDevice() {
  const navigate = useNavigate()
  const message = "Confirm delete SIM"

  function closeModalHandler() {
    navigate("..")
  }
    return (
        <Modal onClose={closeModalHandler}>
            <DeleteItem message={message} />
        </Modal>
    )
}