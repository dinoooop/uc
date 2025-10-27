import { vra } from "./vra.js";

export class vr {
    static validate(name: string, value: unknown, formValues: unknown,  rule: string): string {
        const rules = rule.split("|");

        console.log(name);
        console.log(formValues);
        

        if (rules.includes("required")) {
            if (value === null || value === undefined || value === "" || (typeof value === "string" && value.trim() === "")) {
                return "This field is required.";
            }
        }

        if (rules.includes("string")) {
            if (typeof value !== "string") {
                return "The field must be a string.";
            }

            const min = vra.getMin(rule);
            if (min && value.length < min) {
                return `The value must be at least ${min} characters.`;
            }

            const max = vra.getMax(rule);
            if (max && value.length > max) {
                return `The value may not be greater than ${max} characters.`;
            }
        }

        if (rules.includes("email")) {
            if (typeof value !== "string") {
                return "Invalid email.";
            }

            // Basic but robust regex for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return "Invalid email";
            }
        }

        const inList = vra.getInList(rule);
        if (inList.length > 0) {
            if (typeof value !== "string") {
                return "The field must be a valid option.";
            }
            if (!inList.includes(value)) {
                return 'The value is invalid';
            }
        }

        return "";
    }
}
