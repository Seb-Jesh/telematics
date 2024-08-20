import { Form, useNavigation } from "@remix-run/react";
import styles from './InputForm.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function AddSIMProvider() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" id="unit-form">
      <p>
        <label htmlFor="network">SIM Provider Name</label>
        <input type="text" id="network" name="network" required />
      </p>
      <p>
        <label htmlFor="url">SIM Provider URL</label>
        <input type="text" id="url" name="url" />
      </p>
      <p>
        <label htmlFor="apn">SIM Provider APN</label>
        <input type="text" id="apn" name="apn" />
      </p>
      
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add SIM Provider"}</button>
      </div>
    </Form>
  );
}
