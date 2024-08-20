import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import AddSIMProvider from "~/components/forms/AddSIMProvider"
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { getStoredProviders, storeProviders } from "~/data/store";
import { createProvider } from "~/models/provider.server";
import newproviderStyles from "~/components/forms/InputForm.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: newproviderStyles },
  ];

export const meta: MetaFunction = () => {
    return [
      { title: "Add Provider" },
      { name: "description", content: "Add a IOT SIM Provider" },
    ];
  };

  // export const action = async ({ request }: ActionFunctionArgs) => {
  //   const formData = await request.formData()
  //   const providerData = Object.fromEntries(formData) 
  //   // Add validation
  //   const existingProviders = await getStoredProviders() 
  //   providerData.id = new Date().toISOString()
  //   const updatedProviders = existingProviders.concat(providerData)
  //   await storeProviders(updatedProviders)
  //   return redirect("/providers")
  // };

  export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    // const providerData = Object.fromEntries(formData) 
    const network = formData.get("network");
    const url = formData.get("url");
    const apn = formData.get("apn");
    // Add validation
    if (typeof network !== "string" || network.length === 0) {
      return json({ errors: { network: "Network name is required", url: null, apn: null } }, { status: 400 });
    }
    if (typeof url !== "string" || url.length === 0) {
      return json({ errors: { network: null, url: "URL is required", apn: null } }, { status: 400 });
    }

    if (typeof apn !== "string" || apn.length === 0) {
      return json({ errors: { network: null, url: null, apn: "APN is required" } }, { status: 400 });
    }
    
    await createProvider({ network, url, apn })
    return redirect("/providers")
  };

export default function ProviderForm() {
    return (
        <main>
            <h1>SIM PROVIDERS</h1>
            <AddSIMProvider />
        </main>
    )
}