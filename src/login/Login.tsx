import { MouseEvent, useState } from "react";
import { accountsUrl, createAccessCodeUrl, defaultHeaders } from "../utils/storeApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { jwtLocalStorageKey } from "../utils/jwtUtils";
import { Button, Container, FormLabel, Typography } from "@mui/material";

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
                    <Container sx={{
                        backgroundColor: '#3333',
                        padding: 3,
                        borderRadius: 5,
                        width: '300px',
                        height: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '2px solid #FFF', 
                        boxSizing: 'border-box',
                    }}>
                        <FormLabel htmlFor='email'>Email:</FormLabel>
                        <Field type='text' id='email' name='email' />

                        <FormLabel htmlFor='password'>Password:</FormLabel>
                        <Field type='password' id='password' name='password' />
                        <Button type="submit" disabled={!isValid} >Login</Button>

                        <Button type="button" disabled={!isValid} onClick={() => registerHandler(values)}>Register</Button>
                        {isError && (
                            <Typography>You cannot log in, you have provided wrong credentials or you cannot register with already existing account</Typography>
                        )}
                    </Container>
                </Form>
                )}
        </Formik>
    )
}

export default Login;
