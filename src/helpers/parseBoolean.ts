export const parseBoolean = (value: string) => {
    const lowerValue = value.toLowerCase();
    switch (lowerValue) {
        case "true":
            return true;

        case "false":
            return false;
    }

    throw new Error(`Unsupported value = '${value}'.`);
};
