import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getPlatformByTitle } from "~/models/platform.server";
import invariant from "tiny-invariant";
import styles from '~/components/lists/UnitList.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export async function loader({params}: LoaderFunctionArgs) {
  invariant(params.platformId, "platformId not found");
  const platform = await getPlatformByTitle({ title: params.platformId })
  const clients: string[] = []
  platform?.units.forEach(unit => {
    if(!clients.includes(unit.client.name)) {
      clients.push(unit.client.name)
    }
  })
  
  clients.sort()
  return clients
}

export default function HardwareList() {
    const clients = useLoaderData<typeof loader>();
    return (
      <div className="unit-list">
        <div className="unit-list-panel">
          <h3 id="text-centre">Client List ({clients.length})</h3>
          <ul>
            {clients.map((client) => (
              <li key={client}>
                <NavLink
                  className={({ isActive }) =>
                    `link-active ${isActive ? "bg-white" : ""}`
                  }
                  to={client}
                >
                  <h2>{client}</h2>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="unit-detail-panel">
          <Outlet />
        </div>
      </div>
    );
}