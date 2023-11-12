import { MouseEvent, useState } from "react";
import { createAccessCodeUrl, createAccountUrl, defaultHeaders } from "../utils/storeApi";

const Login = () => {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const registerHandler = (event: MouseEvent) => {
        fetch(createAccountUrl, {
            'method': 'POST',
            'body': JSON.stringify({
                email: email,
                password: password
              }),
            'headers': defaultHeaders,
        })
        .then(response => response.json())
        .then(response => console.log(response.jwt));
    } 

    const loginHandler = (event: MouseEvent) => {
        fetch(createAccessCodeUrl, {
            'method': 'POST',
            'body': JSON.stringify({
                email: email,
                password: password
              }),
            'headers': defaultHeaders
        })
        .then(response => response.json())
        .then(response => console.log(response.jwt));
    } 

    return (
        <div >
            <h1>Login</h1>
            <label>
                Email:
                <input
                    type='text'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Enter your email' />
            </label>
            <label>
                Password:
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Enter your password'/>
            </label>
            <button onClick={loginHandler}>Login</button>
            <button onClick={registerHandler}>Register</button>
        </div>
    )
}

export default Login;
