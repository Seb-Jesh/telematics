import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import PlatformList, { links as platformListLink } from "~/components/lists/PlatformList";
import { getPlatforms } from "~/models/platform.server";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import platformListStyles from "~/components/forms/InputForm.css"

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: platformListStyles }, ...platformListLink()
  ];

export const meta: MetaFunction = () => {
    return [
      { title: "GPS Platform" },
      { name: "description", content: "GPS Platforms List" },
    ];
  };

export const loader = async () => {
    const platforms = await getPlatforms();
    return json({ platforms })
  };

export default function Platforms() {
    const { platforms } = useLoaderData<typeof loader>();
    return (
        <main>
            <PlatformList platforms={platforms} />
        </main>
    )
}