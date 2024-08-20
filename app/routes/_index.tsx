import type { MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import homeStyles from "~/styles/home.css"

export const meta: MetaFunction = () => {
  return [
    { title: "Abercorn App" },
    { name: "description", content: "Abercorn Tracked Assets" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: homeStyles },
];

export default function Index() {
  return (
    <main id="content">
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Keep track of Abercorn Assets</h1>
      </div>
      <div>
        <img src="https://res.cloudinary.com/social4good-uploads/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1701184986/fleet_management_banner_mlgnzm.jpg" />
      </div>
    </main>
  );
}
