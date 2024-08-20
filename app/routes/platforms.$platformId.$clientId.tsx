import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getClient } from "~/models/platform.server";
import invariant from "tiny-invariant";

export async function loader({params}: LoaderFunctionArgs) {
  invariant(params.clientId, "clientId not found");
    const client = await getClient({name: params.clientId});
    if (!client) {
      throw new Response("Client Not Found", { status: 404 });
    }
    return client;
}

export default function UnitDetail() {
    const client = useLoaderData<typeof loader>()
    return (
      <div>
        <Outlet />
        <h1>Client details</h1>
        <table style={{ width: "100%" }}>
          <tbody>
          <tr style={{ height: "30px" }}>
            <th>Client Name</th>
            <td></td>
            <td>{client.name}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Contact Name</th>
            <td></td>
            <td>{client.contact}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Client Phone</th>
            <td></td>
            <td>{client.msisdn}</td>
          </tr>
          <tr style={{ height: "30px" }}>
            <th>Client Address</th>
            <td></td>
            <td>{client.address}</td>
          </tr>
          </tbody>
        </table>
        <div className="btn-actions">
          <button className="btn-delete">Delete</button>
          <Link to="edit">
            <button className="btn-edit">Edit</button>
          </Link>
        </div>
      </div>
    );
}