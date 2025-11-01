import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";
import { registerRule } from "../../bootstrap/stream/registerRule";
import { fomy } from "../../helpers/cssm/fomy";
import InputField from "../../blend/formc/InputField";
import { registerDummy } from "../../bootstrap/stream/registerDummy";
import config from "../../config";
import { registerData } from "../../bootstrap/stream/registerData";

const RegisterPage: React.FC = () => {
  const { register, loading, serverError } = useAuthStore();
  const navigate = useNavigate();

  const initFormValues = config.valuesType == 'dummy' ? registerDummy : registerData;
  const [formValues, setFormValues] = useState(initFormValues);

  const [errors, setErrors] = useState<Record<string, string>>({})

  const onChangeForm = (name: string, value: any) => {
    const newFormValues = fomy.setval(name, value)
    setFormValues(prev => ({ ...prev, ...newFormValues }))

    if (registerRule[name]) {
      const instantNewFormValues = { ...formValues, ...newFormValues }
      const newErrors = fomy.validateOne(name, value, instantNewFormValues, registerRule[name])
      setErrors(prev => ({ ...prev, ...newErrors }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    console.log('handleSubmit')
    const validated = fomy.validateMany(formValues, registerRule)
    if (!validated.allErrorsFalse) {
      setErrors(validated.updatedErrors)
    } else {
      try {
        await register(formValues)
        if (!serverError && !loading) {
          navigate('/admin/profile')
        }
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
          <h1 className="title">Sign Up</h1>
        </div>

        <form className="front-form" onSubmit={handleSubmit} noValidate={true}>
          <InputField name="full_name" formValues={formValues} onChangeForm={onChangeForm} errors={errors} />
          <InputField name="email" formValues={formValues} onChangeForm={onChangeForm} errors={errors} />
          <InputField name="password" formValues={formValues} onChangeForm={onChangeForm} errors={errors} />
          <InputField name="confirm_password" formValues={formValues} onChangeForm={onChangeForm} errors={errors} />

          {serverError && <p className="error-text">{serverError}</p>}

          <button
            type="submit"
            className="btn big"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer text-center">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
          <p>
            Go back to <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
