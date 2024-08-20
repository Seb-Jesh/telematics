import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import AddClient from "~/components/forms/AddClient"

import type { MetaFunction, LinksFunction } from "@remix-run/node";
// import { getStoredClients, storeClients } from "~/data/store"
import addClientStyles from "~/components/forms/InputForm.css"
import { createClient } from "~/models/platform.server";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: addClientStyles },
  ];


export const meta: MetaFunction = () => {
    return [
      { title: "Add Client" },
      { contact: "description", content: "Add a new User" },
    ];
  };

// export const action = async ({ request }: ActionFunctionArgs) => {
//     const formData = await request.formData()
//     const clientData = Object.fromEntries(formData) 
//     // Add validation
//     const existingClients = await getStoredClients() 
//     clientData.id = new Date().toISOString()
//     const updatedClients = existingClients.concat(clientData)
//     await storeClients(updatedClients)
//     return redirect("/clients")
//   };

  export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const name = formData.get("name");
    const contact = formData.get("contact");
    const msisdn = formData.get("msisdn");
    const address = formData.get("address");
    // Add validation
    if (typeof name !== "string" || name === "Please select") {
      return json({ errors: { name: "Name is required", contact: null, msisdn: null, address: null } }, { status: 400 });
    }
    if (typeof contact !== "string" || contact.length === 0) {
      return json({ errors: { name: null, contact: "Contact is required", msisdn: null, address: null } }, { status: 400 });
    }
    if (typeof msisdn !== "string" || msisdn.length === 0) {
      return json({ errors: { name: null, contact: null, msisdn: "Phone is required", address: null } }, { status: 400 });
    }
    if (typeof address !== "string" || address.length === 0) {
      return json({ errors: { name: null, contact: null, msisdn: null, address: "Address is required" } }, { status: 400 });
    }
    await createClient({name, contact, msisdn, address})
    return redirect("/clients")
  };

export default function ClientForm() {
    return (
        <main>
            <h1>Add Client Form</h1>
            <AddClient />
        </main>
    )
}