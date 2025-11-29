import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCarStore from "../../helpers/stores/useCarStore";
import InputField from "../../blend/formc/InputField";
import TextArea from "../../blend/formc/TextArea";
import Select from "../../blend/formc/Select";
import sta from "../../bootstrap/st/sta";
import InputCropFile from "../../blend/formc/InputCropFile";
import Submit from "../../blend/one/Submit";
import { fomy } from "../../helpers/cssm/fomy";
import { carFieldSet } from "../../bootstrap/stream/carFieldSet";
import { sv } from "../../helpers/sv/sv";

interface PinCarEditProps {
    pinFrom?: string;
}
const PinCarEdit: React.FC<PinCarEditProps> = ({ pinFrom = "admin" }) => {
    const { update, loading, serverError, show, item } = useCarStore();

    const navigate = useNavigate();
    const fieldSet = fomy.refineFieldSet(carFieldSet, 'edit')
    const rules = fomy.getFormRules(fieldSet, 'edit')

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formError, setFormError] = useState<string>('');
    const [formValues, setFormValues] = useState(fomy.getFormValuesOrDummy(fieldSet, 'edit'));

    const cancelTo = pinFrom === "account" ? "/account/cars" : "/admin/cars"
    const submitTo = pinFrom === "account" ? "/account/cars" : "/admin/cars"

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const id = parseInt(params.id)
            show(id)
        }
    }, [params])

    useEffect(() => {
        setFormValues(prev => ({ ...prev, ...item }))
    }, [item])

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
                await update(submitData)
                if (!serverError && !loading) {
                    navigate(submitTo)
                }
            } catch (error) {
                console.error(error)
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
                    <InputField name="year" type="number" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                    <InputField name="price" type="number" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                    <InputField name="travelled" type="number" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                    <InputField name="mileage" type="number" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                </div>
                <div className="col-md-6">
                    <InputCropFile name="image" imgCropKey="car_image" fieldSet={fieldSet} formValues={formValues} errors={errors} onChangeForm={onChangeForm} updateExtraFields={updateExtraFields} />
                </div>
            </div>

            {serverError && <p className="error-text">{serverError}</p>}
            {formError && <p className="error-text">{formError}</p>}

            <Submit cto={cancelTo} loading={loading} />
        </form>
    );
};

export default PinCarEdit;
