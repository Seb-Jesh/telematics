import { Form, useNavigation } from "@remix-run/react";
import styles from './InputForm.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function AddDevice({formData, manufacturerOptions}: any) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const processing = formData ? "Editing" : "Adding";
  const content = formData ? "Edit Device" : "Add Device";

  return (
    <Form method="post" id="unit-form">
      {formData ? "" : <p>
      <label htmlFor="maker">Manufacturer</label>
      <select id="maker" name="maker" onChange={function () {}}>
        <option value="">Please select</option>
        {manufacturerOptions.map((e: any) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>
    </p>}
      <p>
        <label htmlFor="model">Device Name</label>
        <input type="text" id="model" name="model" defaultValue={formData ? formData.model : undefined} required />
      </p>
      <p>
        <label htmlFor="sn">Serial Number</label>
        <input type="text" id="sn" name="sn" defaultValue={formData ? formData.sn : undefined} />
      </p>
      <p>
        <label htmlFor="imei">IMEI</label>
        <input type="text" id="imei" name="imei" defaultValue={formData ? formData.imei : undefined} />
      </p>
      
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? processing : content}</button>
      </div>
    </Form>
  );
}
