import { vr } from "../../bootstrap/vr/vr.js";
import { vri } from "../../bootstrap/vr/vri.js";

export class fomy {

    static setval(name: string, value: unknown) {
        switch (name) {
            case 'image':
                if (value instanceof FileList) {
                    console.log("YES");
                    const file = value[0]

                    if (file && file.type.startsWith('image/')) {
                        const fileUrl = URL.createObjectURL(file)
                        return { [name]: file, [name + '_url']: fileUrl }
                    } else {
                        console.warn(`Unsupported file type for ${name}:`, file?.type)
                        return { [name]: null, [name + '_url']: null }
                    }
                }

            default:
                return { [name]: value };
        }
    }

    static validateOne(
        name: string,
        value: unknown,
        formValues: Record<string, unknown>,
        rules: string
    ) {
        const error = vr.validate(name, value, formValues, rules)
        return { [name]: error }
    }

    static validateMany(formValues: any, ruleSet: Record<string, string>) {
        const updatedErrors: Record<string, string> = {}
        Object.entries(formValues).forEach(([name, value]) => {
            if (ruleSet[name]) {
                updatedErrors[name] = vr.validate(name, value, formValues, ruleSet[name])
            }
        })
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === '')
        const firstError = vri.findFirstNonFalseValue(updatedErrors)
        return { firstError, updatedErrors, allErrorsFalse }
    }

}