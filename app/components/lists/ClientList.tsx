import { NavLink, Outlet } from '@remix-run/react';
import styles from './UnitList.css';

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
  }
  

export default function ClientList({ clients }: any) {
  return (
    <div className="unit-list">

        <div className="left-panel">
          <h3>Client List ({clients.length})</h3>

          {clients.length === 0 ? (
            <p className="pad-4">No Clients yet</p>
          ) : (
            <ol>
              {clients.map((client: any) => (
                <li className="left-panel-li" key={client.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `link-active ${isActive ? "bg-white" : ""}`
                    }
                    to={client.name}
                  >
                    {client.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>


        <div className="mid-panel">
          <Outlet />          
        </div>

        <div className="right-panel">
          <img
            src="https://res.cloudinary.com/social4good-uploads/image/upload/v1701076954/wialon_telematics_dgbfld.png"
            alt="PaySmart side banner"
          />
          <address>
            Unit 104 Woodgate House<br></br>
            Cairo Road, Lusaka, Zambia.<br></br>
            Mobile: 0974339546<br></br>
            WhatsApp: 0976233639
          </address>
        </div>
      </div>
  );
}
