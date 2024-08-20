import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getManufacturer } from "~/models/manufacturer.server";
import invariant from "tiny-invariant";
import styles from '~/components/lists/UnitList.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export async function loader({params}: LoaderFunctionArgs) {
  invariant(params.manufacturerId, "providerId not found");
  const manufacturer = await getManufacturer({ maker: params.manufacturerId })
  return manufacturer?.devices;
}

export default function HardwareList() {
    const devices = useLoaderData<typeof loader>();
    return (
      <div className="unit-list">
        <div className="unit-list-panel">
          <h3 id="text-centre">Device List ({devices.length})</h3>
          <ul>
            {devices.map((device) => (
              <li key={device.id}>
                <svg className="list-status" height="25" width="25">
                  <circle cx="9" cy="9" r="6" fill={device.unit?.id ? "green" : "gray"} />
                </svg>
                <NavLink
                  className={({ isActive }) =>
                    `link-active ${isActive ? "bg-white" : ""}`
                  }
                  to={device.id}
                >
                  <h2>{device.imei ? device.imei : device.sn}</h2>
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