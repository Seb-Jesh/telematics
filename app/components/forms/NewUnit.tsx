import { Form, useNavigation } from "@remix-run/react";
import styles from './InputForm.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function NewUnit({formData, clientOptions, deviceOptions, platformOptions}: any) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const processing = formData ? "Editing" : "Adding";
  const content = formData ? "Edit Unit" : "Add Unit";
  const regMarkValue = formData ? formData.regMark : undefined
  const brandValue = formData ? formData.brand : undefined
  const modelValue = formData ? formData.model : undefined
  const vinValue = formData ? formData.vin : undefined
  const engineValue = formData ? formData.engine : undefined
  const yomValue = formData ? formData.yom : undefined
  // console.log(platformOptions)
  return (
    <Form method="post" id="unit-form">
      <div className="form-group">
        <p>
          <label htmlFor="regMark">Reg Mark</label>
          <input type="text" id="regMark" name="regMark" defaultValue={regMarkValue} required />
        </p>
        <p>
          <label htmlFor="brand">Brand</label>
          <input type="text" id="brand" name="brand" defaultValue={brandValue} />
        </p>
        <p>
          <label htmlFor="model">Model</label>
          <input type="text" id="model" name="model" defaultValue={modelValue} />
        </p>
      </div>
      <div className="form-group">
        <p>
          <label htmlFor="vin">VIN</label>
          <input type="text" id="vin" name="vin" defaultValue={vinValue} />
        </p>
        <p>
          <label htmlFor="engine">Engine Number</label>
          <input type="text" id="engine" name="engine" defaultValue={engineValue} />
        </p>
        <p>
          <label htmlFor="yom">Year of Make</label>
          <input type="text" id="yom" name="yom" defaultValue={yomValue} />
        </p>
      </div>
      <div>
        <p>
          <label htmlFor="device">Device IMEI</label>
          <select id="device" name="device" defaultValue={formData ? formData.deviceImei : ''} onChange={function () {}}>
            <option value="">Please select</option>
            {deviceOptions.map((e: any) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
            {formData && <option value={formData.deviceImei}>{formData.deviceImei}</option>}
          </select>
        </p>
        <p>
          <label htmlFor="platform">Platform</label>
          <select id="platform" name="platform" defaultValue={formData ? formData.platformId : ''} onChange={function () {}}>
            <option value="">Please select</option>
            {platformOptions.map((e: any) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
          </select>
        </p>
      </div>
      <p>
        <label htmlFor="client">Client</label>
        <select id="client" name="client" defaultValue={formData ? formData.clientId : ''} onChange={function () {}}>
          <option value="">Please select</option>
          {clientOptions.map((e: any) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? processing : content}
        </button>
      </div>
    </Form>
  );
}
