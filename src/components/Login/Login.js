import React from 'react'
import './Login.css'

import { Button } from '@material-ui/core';

import { auth } from './../../firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useStateValue } from './../../StateProvider';
import { actionTypes } from '../../reducer';

function Login() {

    const [state, dispatch] = useStateValue();

    const provider = new GoogleAuthProvider();

    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user
            
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
              });

            console.log("user logged in: ");
            console.log(user);

            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <div className="login">
            <Button type="submit" onClick={signIn}>
                 Sign In
             </Button>
        </div>
    )
}

export default Login
