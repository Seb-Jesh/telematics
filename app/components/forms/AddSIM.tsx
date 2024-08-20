import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import styles from './InputForm.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function AddSIM({formData, handleInputChange, providerOptions}: any) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const processing = formData ? "Editing" : "Adding";
  const content = formData ? "Edit Sim" : "Add Sim";
  const iccidValue = formData ? formData.iccid : undefined;

  return (
    <Form method="post" id="unit-form">
      {formData ? "" : <p>
        <label htmlFor="title">SIM Provider</label>
        <select id="title" name="title" onChange={function () {}}>
          <option value="">Please select</option>
          {providerOptions.map((e: any) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
      </p>}
      <p>
        <label htmlFor="iccid">ICCID</label>
        <input 
          type="text" 
          id="iccid" 
          name="iccid"
          value={formData ? formData.iccid : undefined} 
          onChange={e => handleInputChange(e, 'iccid')}
          />
      </p>
      <p>
        <label htmlFor="msisdn">MSISDN</label>
        <input type="text" id="msisdn" name="msisdn" value={formData ? formData.msisdn : undefined} onChange={e => handleInputChange(e, 'msisdn')} />
      </p>
      <p>
        <label htmlFor="plan">Data Plan</label>
        <input type="text" id="plan" name="plan" value={formData ? formData.plan : undefined} onChange={e => handleInputChange(e, 'plan')} />
      </p>
      <p>
        <label htmlFor="doa">Date Activated</label>
        <input type="text" id="doa" name="doa" value={formData ? formData.doa : undefined} onChange={e => handleInputChange(e, 'doa')} />
      </p>
      <p>
        <input type="checkbox" id="status" name="status" />
        <label htmlFor="status" className="switch">STATUS</label>
          <span className="slider round"></span>
        
        {/* <label htmlFor="status">STATUS</label>
        <input type="text" id="status" name="status" /> */}
      </p>
      
      <div className="form-actions">
      <button disabled={isSubmitting}>{isSubmitting ? processing : content}</button>
      </div>
    </Form>
  );
}
