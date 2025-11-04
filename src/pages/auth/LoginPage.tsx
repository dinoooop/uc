import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../helpers/stores/useAuthStore";
import { fomy } from "../../helpers/cssm/fomy";
import InputField from "../../blend/formc/InputField";
import config from "../../config";
import { authFieldSet } from "../../bootstrap/stream/authFieldSet";
import Submit from "../../blend/one/Submit";


const LoginPage: React.FC = () => {
  const { login, user, loading, serverError } = useAuthStore();
  const navigate = useNavigate();
  const fieldSet = fomy.refineFieldSet(authFieldSet, 'login')
  const rules = fomy.getFormRules(fieldSet, 'login')

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'login'));

  const onChangeForm = (name: string, value: any) => {
    const instantNewFormValues = { ...formValues, [name]: value }
    const newErrors = fomy.validateOne(name, instantNewFormValues, rules)
    setFormValues(instantNewFormValues)
    setErrors(prev => ({ ...prev, ...newErrors }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validated = fomy.validateMany(formValues, rules)
    if (!validated.allErrorsFalse) {
      setErrors(validated.updatedErrors)
    } else {
      const submitData = fomy.prepareSubmit(formValues)
      try {
        await login(submitData)
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">

        <div className="text-center">
          <div className="logo">{config.appName}</div>
          <h1 className="title">Sign In</h1>
        </div>

        <form className="front-form" onSubmit={handleSubmit}>
          <InputField name="email" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
          <InputField name="password" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />

          {serverError && <p className="color-red">{serverError}</p>}

          <Submit label="Sign In" cssClass="btn big mt-1" loading={loading}/>
        </form>

        <div className="auth-footer text-center">
          <p>
            New here? <Link to="/register">Sign Up</Link> | Go back to <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
