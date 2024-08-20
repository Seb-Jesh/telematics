import { Link, Form, useNavigation } from "@remix-run/react";
import styles from './InputForm.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function LinkSIM({simOptions}: any) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" id="unit-form">
      <p>
      <label htmlFor="simid">SIM</label>
        <select id="simid" name="simid" onChange={function () {}}>
          <option value="">Please select</option>
          {simOptions.map((e: any) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
      </p>

      <div className="form-actions">
        <span>
          <Link to="..">Cancel</Link>
        </span>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Linking..." : "Link SIM"}
        </button>
      </div>
    </Form>
  );
}
