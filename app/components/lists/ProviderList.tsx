// import styles from './List.css';

// export function links() {
//     return [{ rel: 'stylesheet', href: styles }];
//   }

// export default function ProviderList({ providers }) {
//   return (
//     <ul id="note-list">
//       {providers.map((provider, index) => (
//         <li key={provider.id} className="note">
//           <article>
//             <header>
//               <ul className="note-meta">
//                 <li>{index + 1}.</li>
//                 <li>
//                   <h2>{provider.title}</h2>
//                 </li>
//               </ul>
//             </header>
//             <p>URL: {provider.url}</p>
//             <p>APN: {provider.apn}</p>
//           </article>
//         </li>
//       ))}
//     </ul>
//   );
// }

import { NavLink, Outlet } from '@remix-run/react';
import styles from './UnitList.css';

interface Provider {
  id: number
  network: string
  url: string
  apn: string
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
  }
  

export default function ProviderList({ providers }: any) {
  return (
    <div className="unit-list">

        <div className="left-panel">
          <h3>SIM Provider List ({providers.length})</h3>

          {providers.length === 0 ? (
            <p className="pad-4">No Providers yet</p>
          ) : (
            <ol>
              {providers.map((provider: Provider) => (
                <li className="left-panel-li" key={provider.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `link-active ${isActive ? "bg-white" : ""}`
                    }
                    to={provider.network}
                  >
                    {provider.network}
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

