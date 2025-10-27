import React from "react";
import { fm } from "./fm";

interface TextAreaFieldProps {
  name: string;
  formValues: Record<string, any>;
  errors: Record<string, string>;
  onChangeForm: (name: string, value: unknown) => void;
  id?: string;
  label?: string;
}

const TextArea: React.FC<TextAreaFieldProps> = ({
  name,
  formValues,
  errors,
  onChangeForm,
  id = '',
  label = '',
}) => {

  const newId = id || name;
  const newLabel = label || fm.getLabel(name);
  const value = formValues[name] ?? "";
  const error = errors[name] ?? "";

  const onChangeInputField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeForm(name, e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor={newId}>{newLabel}</label>
      <textarea
        className="form-control textarea"
        id={newId}
        value={value}
        name={name}
        onChange={onChangeInputField}
      />
      {error && <div className="color-red">{error}</div>}
    </div>
  );
};

export default TextArea;
