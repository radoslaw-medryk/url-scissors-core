import { ValidationResult } from "./ValidationResult";

export const validateUrl = (value: unknown, maxLength: number): ValidationResult<string> => {
    if (!value) {
        return { isValid: false };
    }

    if (typeof value !== "string") {
        return { isValid: false };
    }

    if (value.length > maxLength) {
        return { isValid: false };
    }

    if (!value.toLowerCase().startsWith(`http://`) && !value.toLowerCase().startsWith(`https://`)) {
        return { isValid: false };
    }

    // TODO [RM]: possible attack vectors with malicious url? needs more validation?

    return { isValid: true, value: value };
};
