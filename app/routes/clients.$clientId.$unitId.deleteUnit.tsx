import { useNavigate } from "@remix-run/react";
import { redirect, MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import Modal from "~/components/util/modal";
import invariant from "tiny-invariant";
import { deleteUnit, getUnitByRegMark } from "~/models/platform.server";
import DeleteItem from "~/components/forms/deleteConfirm";

export const meta: MetaFunction = () => {
  return [
    { title: "Delete Device" },
    { name: "description", content: "Delete Device" },
  ];
};

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.unitId, "unitId not found");  
  const unitId = params.unitId;
  const unit = await getUnitByRegMark({ regMark: unitId })
  const id = unit?.id as number
    await deleteUnit({ id });
    return redirect("../..");
};

export default function DeleteUnit() {
  const navigate = useNavigate()
  const message = "Confirm delete Unit"

  function closeModalHandler() {
    navigate("..")
  }
    return (
        <Modal onClose={closeModalHandler}>
            <DeleteItem message={message} />
        </Modal>
    )
}