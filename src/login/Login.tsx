import { MouseEvent, useState } from "react";
import { accountsUrl, createAccessCodeUrl, defaultHeaders } from "../utils/storeApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { jwtLocalStorageKey } from "../utils/jwtUtils";

interface AccountRequest {
    email: string;
    password: string;
}

const Login: React.FC<{
    checkExpiration: () => void;
}> = ({ checkExpiration })=> {

    const [isError, setIsError] = useState(false);

    const accountRequestInitialValues: AccountRequest = {
        email: '',
        password: ''
    };

    const validation = Yup.object({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const registerHandler = (accountRequest: AccountRequest) => {
        fetch(accountsUrl, {
            'method': 'POST',
            'body': JSON.stringify({
                email: accountRequest.email,
                password: accountRequest.password
              }),
            'headers': defaultHeaders,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .then(response => localStorage.setItem(jwtLocalStorageKey, response.jwt))
        .then(() => checkExpiration())
        .catch(() => setIsError(true));
    };

    const loginHandler = (accountRequest: AccountRequest) => {
        fetch(createAccessCodeUrl, {
            'method': 'POST',
            'body': JSON.stringify({
                email: accountRequest.email,
                password: accountRequest.password
              }),
            'headers': defaultHeaders
        })
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .then(response => localStorage.setItem(jwtLocalStorageKey, response.jwt))
        .then(() => checkExpiration())
        .catch(() => setIsError(true));
    }; 

    return (
        <Formik initialValues={accountRequestInitialValues}
            validationSchema={validation}
            onSubmit={loginHandler}
            initialErrors={{'email': 'Required', 'password': 'Required'}}>
            {({ isValid, values }) => (
                <Form>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <Field type='text' id='email' name='email' />
                        <ErrorMessage name='email' component='div' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <Field type='password' id='password' name='password' />
                        <ErrorMessage name='password' component='div' />
                    </div>

                    <div>
                        <button type="submit" disabled={!isValid} >Login</button>
                    </div>
                    <div>
                        <button type="button" disabled={!isValid} onClick={() => registerHandler(values)}>Register</button>
                    </div>
                    {isError && (
                        <div>
                            <p>You cannot log in, you have provided wrong credentials or you cannot register with already existing account</p>
                        </div>
                    )}
                </Form>
                )}
        </Formik>
    )
}

export default Login;
