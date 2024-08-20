import { Link, Outlet, useMatches, useParams } from "@remix-run/react";

export default function UnitDetail() {
    const params = useParams()
    const matches = useMatches()
    const providersMatch = matches.find(match => match.id === "routes/providers" && match.pathname === "/providers")
    const providers = providersMatch?.data?.providers
    const provider = providers.find((provider) => provider.network === params.providerId)
    const sims = provider.sims
    const sim = sims.find(s => s.id === params.simId)
    return (
      <div>
        <Outlet />
        <h1>SIM details</h1>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr style={{ height: "30px" }}>
              <th>ICCID</th>
              <td></td>
              <td>{sim.iccid ? sim.iccid : "Not available"}</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <th>MSISDN</th>
              <td></td>
              <td>{sim.msisdn === sim.iccid ? "Not available yet" : sim.msisdn}</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <th>Data Plan</th>
              <td></td>
              <td>{sim.plan}</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <th>Date of Activation</th>
              <td></td>
              <td>{sim.doa}</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <th>Activation Status</th>
              <td></td>
              <td>{sim.status ? "Activated" : "Not activated"}</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <th>Linked Unit</th>
              <td></td>
              <td>{sim.device?.unit?.regMark}</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <th>Linked Client</th>
              <td></td>
              <td>{sim.device?.unit?.client?.name}</td>
            </tr>
          </tbody>
        </table>
        <div className="btn-actions">
          <Link to="deleteSim">
            <button className="btn-delete">Delete</button>
          </Link>
          <Link to="edit">
            <button className="btn-edit">Edit</button>
          </Link>
        </div>
      </div>
    );
}