export const urlconfig = {
    idLength: parseInt(process.env.URL_ID_LENGTH || "6"),
    idCharset: process.env.URL_ID_CHARSET || "qwertyuiopasdfghjklzxcvbnm1234567890",
    urlMaxLength: parseInt(process.env.URL_URL_MAX_LENGTH || "8192"),
};
