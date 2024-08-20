import { useMatches, useParams } from "@remix-run/react";
import { Link, Outlet } from "@remix-run/react";

export default function DeviceDetail() {
    const params = useParams()
    const matches = useMatches();
    const devices = matches.find(match => match.id === "routes/manufacturers.$manufacturerId")?.data
    const device = devices.find((device) => device.id === params.deviceId)
    
    return (
      <div>
        <Outlet />
        <h1>Device details</h1>
        <table style={{ width: "100%" }}>
          <tbody>
          <tr style={{ height: "30px" }}>
            <th>Device Name</th>
            <td></td>
            <td>{device?.model}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Serial #</th>
            <td></td>
            <td>{device?.sn}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>IMEI</th>
            <td></td>
            <td>{device?.imei === device?.sn ? "Not available" : device?.imei}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Linked SIM</th>
            <td></td>
            <td>{device?.sim?.msisdn}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Linked Unit</th>
            <td></td>
            <td>{device?.unit?.regMark}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Linked Client</th>
            <td></td>
            <td>{device?.unit?.client.name}</td>
          </tr>
          </tbody>
        </table>
        <div className="btn-actions">
          <Link to="deleteDevice">
            <button className="btn-delete">Delete</button>
          </Link>
          <Link to="linkSim">
            <button className="btn-edit">
              {device?.sim?.msisdn ? 'Unlink Sim' : 'Link Sim'}
            </button>
          </Link>
          <Link to="edit">
            <button className="btn-edit">Edit</button>
          </Link>
        </div>
      </div>
    );
}