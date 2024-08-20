import { useLoaderData } from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import ClientList, { links as clientListLink } from "~/components/lists/ClientList";
import clientListStyles from "~/components/forms/InputForm.css"
import { getClients } from "~/models/platform.server";

export const meta: MetaFunction = () => {
    return [
      { title: "Clients" },
      { name: "description", content: "Client List" },
    ];
  };

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: clientListStyles }, ...clientListLink()
  ];

export const loader = async () => {
    const clients = await getClients()
    return json({ clients })
  };

export default function Clients() {
    const { clients } = useLoaderData<typeof loader>();
    return (
        <main>
            <ClientList clients={clients} />
        </main>
    )
}