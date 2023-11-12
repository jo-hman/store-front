
const baseUrl = 'http://localhost:8080'

export const createAccountUrl = baseUrl + '/accounts'
export const createAccessCodeUrl = createAccountUrl + '/access-codes'

export const defaultHeaders = {'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json'}
