
const baseUrl = 'http://localhost:8080'

export const accountsUrl = baseUrl + '/accounts';
export const createAccessCodeUrl = accountsUrl + '/access-codes';

export const productsUrl = baseUrl + '/products';
export const createProductUrl = productsUrl;

export const ordersUrl = baseUrl + '/orders';

export const defaultHeaders = {'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json'};

export const defaultHeadersWithAuthorization = (accessCode: string | null) => {
    return {'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessCode};
}

