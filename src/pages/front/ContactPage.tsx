import React, { useState } from "react";
import Header from "../../blend/one/Header";
import Footer from "../../blend/one/Footer";
import MiniBanner from "../../blend/one/MiniBanner";
import { fomy } from "../../helpers/cssm/fomy";
import InputField from "../../blend/formc/InputField";
import TextArea from "../../blend/formc/TextArea";
import { useGeneralStore } from "../../helpers/stores/useGeneralStore";
import { generalFieldSet } from "../../bootstrap/stream/generalFieldSet";
import Submit from "../../blend/one/Submit";

const ContactPage: React.FC = () => {
    const { send, serverError, ssm, loading } = useGeneralStore();
    const fieldSet = fomy.refineFieldSet(generalFieldSet, 'contact')
    const rules = fomy.getFormRules(fieldSet, 'contact')

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'contact'));

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
            // setFormError(validated.firstError)
        } else {
            const submitData = fomy.prepareSubmit(formValues)
            try {
                await send(submitData)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <>
            <Header />
            <MiniBanner page="contact" />
            <section className="contact-page">
                <div className="contact-container">
                    {/* Left Side - Google Map */}
                    <div className="contact-map">
                        <iframe
                            title="UC Collection Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.204598347396!2d79.13504647411782!3d10.79333778936264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5546fd3b4d7bcd%3A0x8e9d6ab5a2c5a8c3!2sTamil%20Nadu!5e0!3m2!1sen!2sin!4v1698700000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="contact-form">
                        <h2>Get in Touch</h2>
                        <p>
                            Have questions or need help? Fill out the form and we’ll get back to
                            you shortly.
                        </p>

                        <form className="front-form" onSubmit={handleSubmit}>
                            
                            <InputField name="first_name" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            <InputField name="email" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            
                            <TextArea name="message" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />

                            {serverError && <p className="error-text">{serverError}</p>}
                            {ssm && <p className="success-text">{ssm}</p>}

                            <Submit loading={loading} />
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ContactPage;
