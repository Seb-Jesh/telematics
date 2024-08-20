interface FormFieldProps {
    htmlFor: string
    label: string
    type?: string
    value: any
    onChange?: (...args: any) => any
  }
  
  export function FormField({ htmlFor, label, type = 'text', value, onChange = () => {} }: FormFieldProps) {
    return (
      <>
        <label htmlFor={htmlFor}>
          {label}
        </label>
        <input
          onChange={onChange}
          type={type}
          id={htmlFor}
          name={htmlFor}
          value={value}
        />
      </>
    )
  } 