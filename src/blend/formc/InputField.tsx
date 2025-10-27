import React from "react";
import { fm } from "./fm";

interface InputFieldProps {
  name: string;
  formValues: Record<string, any>;
  onChangeForm: (name: string, value: any) => void;
  errors: Record<string, string>;
  id?: string;
  label?: string;
  type?: string;
  description?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  formValues,
  errors,
  onChangeForm,
  id = '',
  label = '',
  type = '',
  description = '',
  disabled = false,
}) => {
  const newId = id || name;
  const newLabel = label || fm.getLabel(name);
  const value = formValues[name] ?? "";
  const error = errors[name] ?? "";

  let newType: string;
  if (type) {
    newType = type;
  } else if (name.toLowerCase().includes("password")) {
    newType = "password";
  } else {
    newType = name === "email" ? "email" : "text";
  }

  const onChangeInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm(name, e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor={newId}>{newLabel}</label>
      <input
        type={newType}
        className="form-control input-field"
        id={newId}
        value={value}
        name={name}
        onChange={onChangeInputField}
        disabled={disabled}
      />
      {description && <p className="field-description">{description}</p>}
      {error && <div className="color-red">{error}</div>}
    </div>
  );
};

export default InputField;
