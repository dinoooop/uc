import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";
import { fomy } from "../../helpers/cssm/fomy";
import { loginDummy } from "../../bootstrap/stream/loginDummy";
import { loginData } from "../../bootstrap/stream/loginData";
import { loginRule } from "../../bootstrap/stream/loginRule";
import InputField from "../../blend/formc/InputField";
import config from "../../config";


const LoginPage: React.FC = () => {
  const { login, loading, serverError } = useAuthStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({})

  const initFormValues = config.valuesType == 'dummy' ? loginDummy : loginData;
  const [formValues, setFormValues] = useState(initFormValues);

  const onChangeForm = (name: string, value: any) => {
    const newFormValues = fomy.setval(name, value)
    setFormValues(prev => ({ ...prev, ...newFormValues }))

    if (loginRule[name]) {
      const instantNewFormValues = { ...formValues, ...newFormValues }
      const newErrors = fomy.validateOne(name, value, instantNewFormValues, loginRule[name])
      setErrors(prev => ({ ...prev, ...newErrors }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validated = fomy.validateMany(formValues, loginRule)
    if (!validated.allErrorsFalse) {
      setErrors(validated.updatedErrors)
    } else {
      try {
        await login(formValues)
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

        <div className="logo">🚗 UC-Collection</div>
        <h1 className="title text-center">Sign In</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <InputField name="email" formValues={formValues} onChangeForm={onChangeForm} errors={errors} />
          <InputField name="password" formValues={formValues} onChangeForm={onChangeForm} errors={errors} />

          {serverError && <p className="error-text">{serverError}</p>}

          <button
            type="submit"
            className="auth-button signin"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer text-center">
          <p>
            New Here? <Link to="/register">Sign Up</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link> | <Link to="/">Go Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
