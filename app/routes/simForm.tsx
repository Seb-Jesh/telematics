import type { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import AddSIM from "~/components/forms/AddSIM"
import type { MetaFunction, LinksFunction } from "@remix-run/node";
// import { getStoredSims, storeSims, getStoredProviders } from "~/data/store";
import { getProviders, getProviderSims, createSim } from "~/models/provider.server";
import addSIMStyles from "~/components/forms/InputForm.css"

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: addSIMStyles },
  ];

export const meta: MetaFunction = () => {
    return [
      { title: "Add SIM" },
      { name: "description", content: "Add a SIM Card" },
    ];
  };

interface Provider {
    network: string
    url: string
    apn: string
    id: number
  }

export async function loader() {
    // const providers: Provider[] = await getStoredProviders();
    const providers: Provider[] = await getProviders();
    const providerOptions= providers.map(provider => provider.network)

    return json({ providerOptions })
  }

// export const action = async ({ request }: ActionFunctionArgs) => {
//     const formData = await request.formData()
//     const simData = Object.fromEntries(formData) 
//     // Add validation
//     const existingSims = await getStoredSims() 
//     simData.id = new Date().toISOString()
//     const updatedSims = existingSims.concat(simData)
//     await storeSims(updatedSims)
//     return redirect("/Providers")
//   };

  export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    // const simData = Object.fromEntries(formData)
    const iccid: string = formData.get("iccid") as string;
    const msisdn = formData.get("msisdn"); 
    const plan: string = formData.get("plan") as string; 
    const doa = formData.get("doa") as string; 
    const status = formData.get("status") ? true : false
    const network = formData.get("title") as string;
    const provider = await getProviderSims({network});
    const providerId = provider?.id as number;

    // Add validation
    if (typeof msisdn !== "string" || msisdn.length === 0) {
      return json({ errors: { iccid: null, msisdn: "msisdn is required", plan: null, doa: null, status: null, network: null } }, { status: 400 });
    }
    if (typeof network !== "string" || network === "Please select") {
      return json({ errors: { iccid: null, msisdn: "network is required", plan: null, doa: null, status: null, network: null } }, { status: 400 });
    }
    
    await createSim({ iccid, msisdn, plan, doa, status, providerId })
    return redirect("/Providers")
  };

export default function SIMForm() {
  const { providerOptions } = useLoaderData<typeof loader>()
    return (
        <main>
            <h1>Add SIM Card Form</h1>
            <AddSIM providerOptions={providerOptions} />
        </main>
    )
}