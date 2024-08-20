import { NavLink, Outlet } from '@remix-run/react';
import styles from './UnitList.css';

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
  }

interface Manufacturer {
  id: number
  maker: string
  url: string
}
  

export default function HardwareList({ manufacturers }: any) {
  return (
    <div className="unit-list">

        <div className="left-panel">
          <h3>Device Manufacturer List ({manufacturers.length})</h3>

          {manufacturers.length === 0 ? (
            <p className="pad-4">No Manufacturers yet</p>
          ) : (
            <ol>
              {manufacturers.map((manufacturer: Manufacturer) => (
                <li className="left-panel-li" key={manufacturer.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `link-active ${isActive ? "bg-white" : ""}`
                    }
                    to={manufacturer.maker}
                  >
                    {manufacturer.maker}
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
