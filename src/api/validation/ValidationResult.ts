export type ValidationResult<T> =
    | {
          isValid: true;
          value: T;
      }
    | {
          isValid: false;
      };
