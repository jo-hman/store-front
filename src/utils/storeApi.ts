
const baseUrl = 'http://localhost:8080'

const accountsUrl = baseUrl + '/accounts';
export const createAccountUrl = accountsUrl;
export const createAccessCodeUrl = accountsUrl + '/access-codes';

const productsUrl = baseUrl + '/products';
export const getProductsUrl = productsUrl;
export const createProductUrl = productsUrl;


export const defaultHeaders = {'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json'};

export const defaultHeadersWithAuthorization = (accessCode: string | null) => {
    return {'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessCode};
}

export const jwtLocalStorageKey = 'accessCode';
