import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import useCarStore from "./useCarStore";
import { carCreateData } from "../../bootstrap/stream/carCreateData";
import { carCreateDummy } from "../../bootstrap/stream/carCreateDummy";
import InputField from "../../blend/formc/InputField";
import { fomy } from "../../helpers/cssm/fomy";
import { carCreateRule } from "../../bootstrap/stream/carCreateRule";
import TextArea from "../../blend/formc/TextArea";
import Select from "../../blend/formc/Select";
import { st } from "../../bootstrap/st/st";
import sta from "../../bootstrap/st/sta";
import InputCropFile from "../../blend/formc/InputCropFile";

const CarCreatePage: React.FC = () => {
  const { store, loading, serverError, reset } = useCarStore();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string>('');

  const initFormValues = config.valuesType == 'dummy' ? carCreateDummy : carCreateData;
  const [formValues, setFormValues] = useState(initFormValues);


  const onChangeForm = (name: string, value: unknown) => {
    console.log("change in image")
    const newFormValues = fomy.setval(name, value)
    setFormValues(prev => ({ ...prev, ...newFormValues }))

    if (carCreateRule[name]) {
      const instantNewFormValues = { ...formValues, ...newFormValues }
      const newErrors = fomy.validateOne(name, value, instantNewFormValues, carCreateRule[name])
      setErrors(prev => ({ ...prev, ...newErrors }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validated = fomy.validateMany(formValues, carCreateRule)
    if (!validated.allErrorsFalse) {
      setErrors(validated.updatedErrors)
      setFormError(validated.firstError)
    } else {
      try {
        await store(formValues)
        if (!serverError && !loading) {
          // navigate('/admin/profile')
        }
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <>
      <Header />
      <MiniBanner page="create_car" />

      <div className="section front-form">
        <h1 className="title text-center">Sell my car</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
            </div>
            <div className="col-md-6">
              <InputField name="price" type="number" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
            </div>
            <div className="col-md-12">
              <TextArea name="description" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
            </div>
            <div className="col-md-6">
              <Select name="brand" formValues={formValues} errors={errors} onChangeForm={onChangeForm} options={sta.brands} />
            </div>
            <div className="col-md-6">
              <InputField name="year" type="number" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
            </div>
            <div className="col-md-6">
              <InputCropFile name="image" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
            </div>
          </div>


          {serverError && <p className="error-text">{serverError}</p>}
          {formError && <p className="error-text">{formError}</p>}

          <button type="submit" className="auth-button signup" disabled={loading}>
            {loading ? "Creating..." : "Create Car"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CarCreatePage;
