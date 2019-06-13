import { ValidationResult } from "./ValidationResult";

export const validateId = (value: unknown, maxLength: number): ValidationResult<string> => {
    if (!value) {
        return { isValid: false };
    }

    if (typeof value !== "string") {
        return { isValid: false };
    }

    if (value.length > maxLength) {
        return { isValid: false };
    }

    return { isValid: true, value: value };
};
