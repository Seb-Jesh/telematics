// import { Link } from '@remix-run/react';
// import styles from './List.css';

// export function links() {
//   return [{ rel: 'stylesheet', href: styles }];
// }

// export default function PlatformList({ platforms }) {
//   return (
//     <ul id="note-list">
//       {platforms.map((platform, index) => (
//         <li key={platform.id} className="note">
//           <article>
//             <header>
//               <ul className="note-meta">
//                 <li>{index + 1}.</li>
//                 <li>
//                   <h2>{platform.title}</h2>
//                 </li>
//               </ul>
//             </header>
//             <Link style={{color:"white"}} to={platform.url} target='blank'>{platform.url}</Link>
//           </article>
//         </li>
//       ))}
//     </ul>
//   );
// }

import { Link, NavLink, Outlet } from '@remix-run/react';
import styles from './UnitList.css';

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
  }

interface Platform {
  id: number
  title: string
  url: string
}
  

export default function PlatformList({ platforms }: any) {
  return (
    <div className="unit-list">

        <div className="left-panel">
          <h3>Platform List ({platforms.length})</h3>

          {platforms.length === 0 ? (
            <p className="pad-4">No Platforms yet</p>
          ) : (
            <ol>
              {platforms.map((platform: Platform) => (
                <li className="left-panel-li" key={platform.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `link-active ${isActive ? "bg-white" : ""}`
                    }
                    to={platform.title}
                  >
                    {platform.title}
                  </NavLink>
                    <p className='my-5'><Link style={{color: 'blue'}} to={platform.url} target='blank'>Go to platform</Link></p>
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
