import { Form, useNavigation } from "@remix-run/react";
import styles from './InputForm.css';
import { FormField } from "./form-field";

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function AddManufacturer({formData, handleInputChange}: any) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" id="unit-form">
      <p>
      <FormField
        htmlFor="maker"
        label="Manufacturer Name"
        value={formData.maker}
        onChange={e => handleInputChange(e, 'maker')}
      >
      </FormField>
      </p>
      
      <p>
      <FormField
        htmlFor="url"
        label="Website"
        value={formData.url}
        onChange={e => handleInputChange(e, 'url')}
      >
      </FormField>
      </p>
      
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Manufacturer"}</button>
      </div>
    </Form>
  );
}
