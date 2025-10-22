import React from "react";
import { fm } from "./fm";

interface InputFieldProps {
  name: string;
  formValues: Record<string, string>;
  errors: Record<string, string>;
  onChangeForm: (updatedValues: Record<string, string>) => void;
  type?: string | null;
  label?: string | null;
  id?: string | null;
  disabled?: boolean;
  description?: string | null;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  formValues,
  errors,
  onChangeForm,
  type = null,
  label = null,
  id = null,
  disabled = false,
  description = null,
}) => {
  const newId = id ?? name;
  const newLabel = label ?? fm.getLabel(name);
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
    onChangeForm({ [name]: e.target.value });
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
