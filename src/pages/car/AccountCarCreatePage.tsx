import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import MiniBanner from "../../blend/one/MiniBanner";
import Header from "../../blend/one/Header";
import useCarStore from "../../helpers/stores/useCarStore";
import { carCreateData } from "../../../trash/carCreateData";
import { carCreateDummy } from "../../../trash/carCreateDummy";
import InputField from "../../blend/formc/InputField";
import { fomy } from "../../helpers/cssm/fomy";
import { carCreateRule } from "../../../trash/carCreateRule";
import TextArea from "../../blend/formc/TextArea";
import Select from "../../blend/formc/Select";
import sta from "../../bootstrap/st/sta";
import InputCropFile from "../../blend/formc/InputCropFile";
import Footer from "../../blend/one/Footer";
import { carFieldSet } from "../../bootstrap/stream/carFieldSet";
import Submit from "../../blend/one/Submit";
import AccountQuickLinks from "../../blend/one/AccountQuickLinks";

const AccountCarCreatePage: React.FC = () => {
  const { store, loading, serverError } = useCarStore();

  const navigate = useNavigate();
  const fieldSet = fomy.refineFieldSet(carFieldSet, 'create')
  const rules = fomy.getFormRules(fieldSet, 'create')

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string>('');
  const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'create'));

  const onChangeForm = (name: string, value: any) => {
    const instantNewFormValues = { ...formValues, [name]: value }
    const newErrors = fomy.validateOne(name, instantNewFormValues, rules)
    setFormValues(instantNewFormValues)
    setErrors(prev => ({ ...prev, ...newErrors }))
  }

  const updateExtraFields = (newFormValue: Record<string, any>) => {
    setFormValues(prev => ({ ...prev, ...newFormValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validated = fomy.validateMany(formValues, rules)
    if (!validated.allErrorsFalse) {
      setErrors(validated.updatedErrors)
      setFormError(validated.firstError)
    } else {
      const submitData = fomy.prepareSubmit(formValues)
      try {
        await store(submitData)
        if (!serverError && !loading) {
          navigate('/admin/cars')
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
        <div className="wrapper-fluid">
          <div className="row">
            <div className="col-md-3">
              <AccountQuickLinks />
            </div>
            <div className="col-md-9">
              <form className="front-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <InputField name="title" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                  </div>
                  <div className="col-md-6">
                    <Select name="brand" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} options={sta.brands} />
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

                <Submit cto="/admin/cars" loading={loading} />
              </form>
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountCarCreatePage;
