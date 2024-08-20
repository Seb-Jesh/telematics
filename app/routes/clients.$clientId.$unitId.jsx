import { Link, Outlet, useMatches, useParams } from "@remix-run/react";
// import type { LoaderFunctionArgs } from "@remix-run/node";
// import { getStoredUnits } from "~/data/store";
import { getUnit } from "~/models/platform.server";
import invariant from "tiny-invariant";

// interface Unit {
//     id: string
//     client: string
//     title: string
//     brand: string
//     model: string
//     yom: string
//     vin: string
//     engine: string
//     device: string
//     platform: string
//     sim: string
//   }

// export async function loader({params}: LoaderFunctionArgs) {
//   invariant(params.unitId, "unitId not found");
//     const unit = await getUnit({regMark: params.unitId});
//     if (!unit) {
//       throw new Response("Units Not Found", { status: 404 });
//     }
//     return unit;
// }

export default function UnitDetail() {
  const params = useParams();
  const matches = useMatches();
  const clients = matches.find((match) => match.id === 'routes/clients').data.clients
  const client = clients.find((item) => item.name === params.clientId)
  const units = client.units
  const unit = units.find(item => item.regMark === params.unitId)
  
    return (
      <div>
        <Outlet />
        <h1>Unit details</h1>
        <table style={{ width: "100%" }}>
          <tbody>
          <tr style={{ height: "30px" }}>
            <th>Brand</th>
            <td></td>
            <td>{unit.brand}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Model</th>
            <td></td>
            <td>{unit.model}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Year of Make</th>
            <td></td>
            <td>{unit.yom}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>VIN</th>
            <td></td>
            <td>{unit.vin}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Engine #</th>
            <td></td>
            <td>{unit.engine}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Device IMEI</th>
            <td></td>
            <td>{unit.device.imei}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Platform</th>
            <td></td>
            <td>{unit.platform.title}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Linked SIM</th>
            <td></td>
            <td>{unit.device.sim?.msisdn}</td>
          </tr>
          </tbody>
        </table>
        <div className="btn-actions">
          <Link to="deleteUnit">
            <button className="btn-delete">Delete</button>
          </Link>
          <Link to="edit">
            <button className="btn-edit">Edit</button>
          </Link>
        </div>
      </div>
    );
}