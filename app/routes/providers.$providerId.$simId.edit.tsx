import { useLoaderData, useNavigate } from "@remix-run/react";
import { redirect, MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import AddSIM from "~/components/forms/AddSIM";
import Modal from "~/components/util/modal";
import { UpdateSim } from "~/models/provider.server";
import { getSim } from "~/models/provider.server";
import invariant from "tiny-invariant";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit SIM" },
    { name: "description", content: "Edit SIM details" },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.simId, "simId not found");
  const simId = params.simId
  const sim = await getSim({id: simId});
  return sim
}

export const action: ActionFunction = async ({ params, request }) => {
  invariant(params.simId, "simId not found");
  const id = params.simId
  const formData = await request.formData()
  const iccid = formData.get("iccid") as string; 
  const msisdn = formData.get("msisdn") as string;
  const plan = formData.get("plan") as string; 
  const doa = formData.get("doa") as string; 
  const status = formData.get("status") ? true : false;
  await UpdateSim({id, iccid, msisdn, plan, doa, status})
  return redirect("..")
}

export default function EditSIM() {
  const navigate = useNavigate()
  const sim = useLoaderData<typeof loader>()

  const [formData, setFormData] = useState({
    iccid: sim.iccid,
    msisdn: sim.msisdn,
    plan: sim.plan,
    doa: sim.doa,
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(form => ({ ...form, [field]: event.target.value }))
  }

  function closeModalHandler() {
    navigate("..")
  }
    return (
        <Modal onClose={closeModalHandler}>
            <AddSIM  formData={formData} handleInputChange={handleInputChange} />
        </Modal>
    )
}