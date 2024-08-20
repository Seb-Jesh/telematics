import { NavLink, Outlet, useMatches, useParams } from "@remix-run/react";
import styles from '~/components/lists/UnitList.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function UnitDetails() {
    const params = useParams()
    const matches = useMatches()
    const providersMatch = matches.find(match => match.id === "routes/providers" && match.pathname === "/providers")
    const providers = providersMatch?.data?.providers
    const provider = providers.find(provider => provider.network === params.providerId)
    const sims = provider.sims
    return (
      <div className="unit-list">
        <div className="unit-list-panel">
          <h3 id="text-centre">SIM List ({sims.length})</h3>
          <ul>
            {sims.map(sim => (
              <li key={sim.id}>
                <svg className="list-status" height="25" width="25">
                  <circle cx="9" cy="9" r="6" fill={sim.device?.imei ? "green" : "gray"} />
                </svg>
                <NavLink
                  className={({ isActive }) =>
                    `link-active ${isActive ? "bg-white" : ""}`
                  }
                  to={sim.id}
                >
                  <h2>{sim.msisdn}</h2>
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