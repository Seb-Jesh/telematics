import { useLoaderData } from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import ManufacturerList, { links as deviceListLink } from "~/components/lists/ManufacturerList";
import { getManufacturers } from "~/models/manufacturer.server";
import deviceListStyles from "~/components/forms/InputForm.css"

export const meta: MetaFunction = () => {
    return [
      { title: "Devices" },
      { name: "description", content: "GPS Device List" },
    ];
  };

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: deviceListStyles }, ...deviceListLink()
  ];

export const loader = async () => {
    const manufacturers = await getManufacturers();    
    return json({ manufacturers })
  };

export default function Manufacturers() {
    const { manufacturers } = useLoaderData<typeof loader>();
    return (
        <main>
            <ManufacturerList manufacturers={manufacturers} />
        </main>
    )
}