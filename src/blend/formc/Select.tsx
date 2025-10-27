import React from "react";
import { fm } from "./fm";

export interface OptionItem {
    label: string;
    value: number | string;
}

interface SelectFieldProps {
  name: string;
  formValues: Record<string, any>;
  onChangeForm: (name: string, value: string | number) => void;
  errors: Record<string, string>;
  id?: string;
  label?: string;
  options?: OptionItem[];
  showEmpty?: boolean;
  className?: string;
}


const Select: React.FC<SelectFieldProps> = ({
  name,
  formValues,
  onChangeForm,
  errors,
  id,
  label,
  options = [],
  showEmpty = true,
  className = "form-control",
}) => {
  const newId = id ?? name;
  const newLabel = label ?? fm.getLabel(name);
  const value = formValues[name] ?? "";
  const error = errors[name] ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeForm(name, e.target.value);
  };

  return (
    <div className="form-group">
      {newLabel && <label htmlFor={newId}>{newLabel}</label>}

      <select
        id={newId}
        name={name}
        value={value}
        onChange={handleChange}
        className={className}
      >
        {showEmpty && (
          <option value="">
            -- Select --
          </option>
        )}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default Select;
