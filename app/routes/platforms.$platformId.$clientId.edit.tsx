import { useMatches, useNavigate } from "@remix-run/react";
import { json, redirect, MetaFunction, LoaderFunction, ActionFunctionArgs } from "@remix-run/node";
// import { useState } from "react";
import AddClient from "~/components/forms/AddClient";
import Modal from "~/components/util/modal";
import { getClient, UpdateClient } from "~/models/platform.server";
// import { createClient } from "~/models/platform.server";
import invariant from "tiny-invariant";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Client" },
    { name: "description", content: "Edit Client details" },
  ];
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.clientId, "clientId not found");
  const formData = await request.formData();
  const client = await getClient({name: params.clientId});
  const id = client?.id as number;
  const name = formData.get("name");
  const contact = formData.get("contact");
  const msisdn = formData.get("msisdn");
  const address = formData.get("address");
  // Add validation
  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { newName: "Name is required", contact: null, msisdn: null, address: null } }, { status: 400 });
  }
  if (typeof contact !== "string" || contact.length === 0) {
    return json({ errors: { newName: null, contact: "Contact is required", msisdn: null, address: null } }, { status: 400 });
  }
  if (typeof msisdn !== "string" || msisdn.length === 0) {
    return json({ errors: { newName: null, contact: null, msisdn: "Phone is required", address: null } }, { status: 400 });
  }
  if (typeof address !== "string" || address.length === 0) {
    return json({ errors: { newName: null, contact: null, msisdn: null, address: "Address is required" } }, { status: 400 });
  }
  await UpdateClient({id, name, contact, msisdn, address})
  if(name === client?.name) {
    return redirect("..")
  }
  return redirect("../..")
};

export default function EditSIM() {
  const navigate = useNavigate()
  const matches = useMatches()
  const clientData = matches.find(match => match.id === "routes/platforms.$platformId.$clientId");
  const formData = clientData?.data

  function closeModalHandler() {
    navigate("..")
  }
    return (
        <Modal onClose={closeModalHandler}>
            <AddClient formData={formData} />
        </Modal>
    )
}