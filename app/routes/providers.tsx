import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import ProviderList, { links as providerListLink } from "~/components/lists/ProviderList";
import { getProviders } from "~/models/provider.server";

import type { MetaFunction, LinksFunction } from "@remix-run/node";
import providerListStyles from "~/components/forms/InputForm.css"

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: providerListStyles }, ...providerListLink()
  ];

export const meta: MetaFunction = () => {
    return [
      { title: "SIM Providers" },
      { name: "description", content: "SIM Providers List" },
    ];
  };

export const loader = async () => {
    const providers = await getProviders()
    return json({ providers })
  };

export default function Providers() {
    const { providers } = useLoaderData<typeof loader>();
    return (
        <main>
            <ProviderList providers={providers} />
        </main>
    )
}