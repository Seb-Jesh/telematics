import { NavLink } from '@remix-run/react';

export default function Navigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="/units">Units</NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink to="/clients">Clients</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/manufacturers">Hardware</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="/sims">SIM Cards</NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink to="/providers">SIM Providers</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/platforms">Platforms</NavLink>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">
              Add
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <NavLink to="/SIMForm">Add SIM</NavLink>
              <NavLink to="/UnitForm">Add Unit</NavLink>
              <NavLink to="/DeviceForm">Add Device</NavLink>
              <NavLink to="/ClientForm">Add Client</NavLink>
              <NavLink to="/PlatformForm">Add Platform</NavLink>
              <NavLink to="/ProviderForm">Add Provider</NavLink>
              <NavLink to="/ManufacturerForm">Add Manufacturer</NavLink>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}