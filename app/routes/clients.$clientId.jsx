import { NavLink, Outlet, useMatches, useParams } from "@remix-run/react";
import styles from '~/components/lists/UnitList.css';
export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function UnitDetails() {
  const params = useParams();
  const matches = useMatches();
  const clients = matches.find((match) => match.id === 'routes/clients').data.clients
  const client = clients.find((item) => item.name === params.clientId)
  const units = client.units
    
    return (
      <div className="unit-list">
        <div className="unit-list-panel">
            <h3 id="text-centre">Unit List ({units.length})</h3>
            <ul>
            {units.map(unit => (
                <li key={unit.id}>
                <NavLink className={({ isActive }) =>
                      `link-active ${isActive ? "bg-white" : ""}`
                    } to={unit.regMark}>
                    <h2>{unit.regMark}</h2>
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