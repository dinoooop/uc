import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCarStore from "../../helpers/stores/useCarStore";
import InputField from "../../blend/formc/InputField";
import TextArea from "../../blend/formc/TextArea";
import Select from "../../blend/formc/Select";
import { fomy } from "../../helpers/cssm/fomy";
import InputCropFile from "../../blend/formc/InputCropFile";
import Submit from "../../blend/one/Submit";
import { carFieldSet } from "../../bootstrap/stream/carFieldSet";
import { sv } from "../../helpers/sv/sv";

interface PinCarCreateProps {
  pinFrom?: "account" | "admin" | string;
}

const PinCarCreate: React.FC<PinCarCreateProps> = ({ pinFrom = "account" }) => {
  const { store, loading, serverError } = useCarStore();

  console.log(sv.brands());
  const navigate = useNavigate();
  const fieldSet = fomy.refineFieldSet(carFieldSet, "create");
  const rules = fomy.getFormRules(fieldSet, "create");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>("");
  const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, "create"));

  const onChangeForm = (name: string, value: any) => {
    const instantNewFormValues = { ...formValues, [name]: value };
    const newErrors = fomy.validateOne(name, instantNewFormValues, rules);
    setFormValues(instantNewFormValues);
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const updateExtraFields = (newFormValue: Record<string, any>) => {
    setFormValues((prev) => ({ ...prev, ...newFormValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validated = fomy.validateMany(formValues, rules);
    if (!validated.allErrorsFalse) {
      setErrors(validated.updatedErrors);
      setFormError(validated.firstError);
    } else {
      const submitData = fomy.prepareSubmit(formValues);
      try {
        await store(submitData);
        if (!serverError && !loading) {
          // navigate depending on where this form was used
          if (pinFrom === "admin") {
            navigate("/admin/cars");
          } else {
            navigate("/account/cars");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className="front-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <InputField name="title" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
        </div>
        <div className="col-md-6">
          <Select name="brand" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} options={sv.brands()} />
        </div>
        <div className="col-md-12">
          <TextArea name="description" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <InputCropFile name="image" imgCropKey="car_image" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} updateExtraFields={updateExtraFields} />
        </div>
        <div className="col-md-6">
          <InputField name="year" type="number" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
          <InputField name="price" type="number" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
          <InputField name="travelled" type="number" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
          <InputField name="mileage" type="number" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
        </div>
      </div>

      {serverError && <p className="error-text">{serverError}</p>}
      {formError && <p className="error-text">{formError}</p>}
      <Submit cto={pinFrom === "admin" ? "/admin/cars" : "/account/cars"} loading={loading} />
    </form>
  );
};

export default PinCarCreate;
