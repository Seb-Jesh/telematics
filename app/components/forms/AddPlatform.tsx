import { Form, useNavigation } from "@remix-run/react";
import styles from './InputForm.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function AddPlatform() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" id="unit-form">
      <p>
        <label htmlFor="title">Platform Name</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="url">Website</label>
        <input type="text" id="url" name="url" />
      </p>
      
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Platform"}</button>
      </div>
    </Form>
  );
}
