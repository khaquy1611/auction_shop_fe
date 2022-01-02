export const cookieOptions = {
    path: '/',
    domain: window.location.host.includes(".pentawork.com") ? '.pentawork.com' : '',
    secure: window.location.protocol === 'https:',
    expires: new Date(Date.now() + (3600 * 1000 * 3))
};
export const FCM_TOKEN_KEY = "fcm-token";
export const API_NAME = "local";
export const API_URL = process.env.API_URL;
export const MOON_PAY_URL = "https://buy-staging.moonpay.com?apiKey=pk_test_0de2X0CL9UcwcUxKqPSuoTiueSYrPT3&currencyCode=eth&redirectURL=" + window.location.origin + "/moon-pay-result";