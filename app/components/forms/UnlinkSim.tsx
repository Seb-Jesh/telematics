import type { LinksFunction } from "@remix-run/node";
import { Link, Form } from "@remix-run/react";
import styles from './InputForm.css';

// export function links() {
//   return [{ rel: 'stylesheet', href: styles }];
// }

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function UnlinkSIM() {

  return (
    <Form method="post" id="unit-form">
      <p id="text-center">
      Confirm to unlink Sim
      </p>

      <div className="form-actions">
        <span>
          <Link to="..">Cancel</Link>
        </span>
        <button>
          Confirm
        </button>
      </div>
    </Form>
  );
}
