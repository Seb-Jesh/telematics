import { Form, useNavigation } from "@remix-run/react";
import styles from './InputForm.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function AddClient({formData}: any) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const processing = formData ? "Editing" : "Adding";
  const content = formData ? "Edit Client" : "Add Client";
  
  return (
    <Form method="post" id="unit-form">
      <p>
        <label htmlFor="name">Client Name</label>
        <input type="text" id="name" name="name" defaultValue={formData ? formData.name : ''} required />
      </p>
      <p>
        <label htmlFor="contact">Contact Person</label>
        <input type="text" id="contact" name="contact" defaultValue={formData ? formData.contact : ''} />
      </p>
      <p>
        <label htmlFor="msisdn">Phone</label>
        <input type="text" id="msisdn" name="msisdn" defaultValue={formData ? formData.msisdn : ''} />
      </p>
      <p>
        <label htmlFor="address">Address</label>
        <textarea id="address" name="address" defaultValue={formData ? formData.address : ''} rows={5} required />
      </p>
      
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? processing : content}</button>
      </div>
    </Form>
  );
}
