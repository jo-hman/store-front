
const baseUrl = 'http://localhost:8080'

export const createAccountUrl = baseUrl + '/accounts'
export const createAccessCodeUrl = createAccountUrl + '/access-codes'

export const getProductsUrl = baseUrl + '/products'


export const defaultHeaders = {'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json'}

export const defaultHeadersWithAuthorization = (accessCode: string | null) => {
    return {'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessCode}
}

export const jwtLocalStorageKey = 'accessCode';
