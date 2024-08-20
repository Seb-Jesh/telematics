import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getUnit } from "~/models/platform.server";
import styles from "~/styles/unit-details.css";
import invariant from "tiny-invariant";

export function links() {
    return [{rel: "stylesheet", href: styles}]
}

export async function loader({params}: LoaderFunctionArgs) {
    invariant(params.unitId, "unitId not found");
    const unit = await getUnit({regMark: params.unitId});
    return unit;
}

export default function UnitDetails() {
    const unit = useLoaderData<typeof loader>()
    return <main id="unit-details">
        <h1>Unit details</h1>
            <table style={{width:"100%"}}>
                <tr style={{height:"30px"}}>
                    <th>Brand</th>
                    <td></td>
                    <td>{unit?.brand}</td>
                </tr>
                <tr style={{height:"30px"}}>
                    <th>Model</th>
                    <td></td>
                    <td>{unit?.model}</td>
                </tr>
                <tr style={{height:"30px"}}>
                    <th>Year of Make</th>
                    <td></td>
                    <td>{unit?.yom}</td>
                </tr>
                <tr style={{height:"30px"}}>
                    <th>VIN</th>
                    <td></td>
                    <td>{unit?.vin}</td>
                </tr>
                <tr style={{height:"30px"}}>
                    <th>Engine #</th>
                    <td></td>
                    <td>{unit?.engine}</td>
                </tr>
                <tr style={{height:"30px"}}>
                    <th>Device Type</th>
                    <td></td>
                    <td>{unit?.device.model}</td>
                </tr>
                <tr style={{height:"30px"}}>
                    <th>Device IMEI</th>
                    <td></td>
                    <td>{unit?.device.imei}</td>
                </tr>
                <tr style={{height:"30px"}}>
                    <th>Platform</th>
                    <td></td>
                    <td>{unit?.platform.title}</td>
                </tr>
                <tr style={{height:"30px"}}>
                    <th>Linked SIM</th>
                    <td></td>
                    <td>{unit?.device.sim?.msisdn}</td>
                </tr>
                <tr style={{height:"30px"}}>
                    <th>Client</th>
                    <td></td>
                    <td>{unit?.client?.name}</td>
                </tr>
            </table>
    </main>
}