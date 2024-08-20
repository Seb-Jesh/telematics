import { NavLink, Outlet } from '@remix-run/react';
import styles from './UnitList.css';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
  }

export default function UnitList({ units }: any) {
  return (
    <div className="unit-list">
        <div className="left-panel">
          <h3>Unit List ({units.length})</h3>

          {units.length === 0 ? (
            <p className="pad-4">No Lists yet</p>
          ) : (
            <ol>
              {units.map((unit: any) => (
                <li className="left-panel-li" key={unit.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `link-active ${isActive ? "bg-white" : ""}`
                    }
                    to={unit.regMark}
                  >
                    {unit.regMark}
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
            WhatsApp: 0769900388
          </address>
        </div>
      </div>
  );
}
