import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import useCarStore from "./useCarStore";
import InputField from "../../blend/formc/InputField";
import { fomy } from "../../helpers/cssm/fomy";
import { carCreateRule } from "../../bootstrap/stream/carCreateRule";
import TextArea from "../../blend/formc/TextArea";
import Select from "../../blend/formc/Select";
import sta from "../../bootstrap/st/sta";
import InputCropFile from "../../blend/formc/InputCropFile";
import { carEditData } from "../../bootstrap/stream/carEditData";

const FrontCarEditPage: React.FC = () => {
  const { update, loading, serverError, show, reset, item } = useCarStore();
  const navigate = useNavigate();
  const params = useParams()

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string>('');
  const [formValues, setFormValues] = useState(carEditData(item));

  useEffect(() => {
    reset()
    if (params.id) {
      const id = parseInt(params.id)
      show(id)
    }
  }, [params])

  useEffect(() => {
    setFormValues(carEditData(item))
  }, [item])


  const onChangeForm = (name: string, value: unknown) => {
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
        await update(formValues)
        if (!serverError && !loading) {
          navigate('/cars')
        }
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <>
      <Header />
      <MiniBanner page="car_create" />
      <div className="part bg-grey">
        <div className="wrapper">

          <form className="front-form" onSubmit={handleSubmit}>
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
                <InputCropFile name="image" id="car_image" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
              </div>
            </div>


            {serverError && <p className="error-text">{serverError}</p>}
            {formError && <p className="error-text">{formError}</p>}

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FrontCarEditPage;
