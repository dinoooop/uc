import { vra } from "./vra.js";

export class vr {
    static validate(name: string, value: unknown, formValues: unknown, rule: string): string {
        const rules = rule.split("|");

        if (rules.includes("required")) {
            if (value === null || value === undefined || value === "" || (typeof value === "string" && value.trim() === "")) {
                return "This field is required.";
            }
        }

        if (rules.includes("string")) {
            if (typeof value !== "string") {
                return `The field (${name}) must be a string.`;
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


        if (rules.includes("file")) {
            if (!(value instanceof File) && typeof value !== "string") {
                return `Please upload a valid file for (${name}).`;
            }
        }

        if (rules.includes("image")) {
            // Allow existing image URLs (string values)
            if (typeof value === "string" && value.trim() !== "") {
                return "";
            }

            // Allow uploaded File objects that are image types
            if (value instanceof File) {
                if (!value.type.startsWith("image/")) {
                    return `The file for (${name}) must be an image.`;
                }
                return "";
            }

            // If neither string nor File, it's invalid
            return `Please upload a valid image file for (${name}).`;
        }

        const maxSize = vra.getMaxSize(rule);
        if (maxSize && value instanceof File) {
            const maxBytes = maxSize * 1024 * 1024;
            if (value.size > maxBytes) {
                return `The file size for (${name}) must not exceed ${maxSize} MB.`;
            }
        }

        return "";
    }
}
