// TODO [RM]: very naive implementation, but easy and works well for short strings

export const randomString = (length: number, charset: string) => {
    let result = "";

    for (let i = 0; i < length; i++) {
        const charIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(charIndex);
    }

    return result;
};
