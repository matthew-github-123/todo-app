import React from 'react'
import { useEffect } from 'react'
import './Body.css'

import Todo from './Todo/Todo'

import { doc, getDoc, setDoc, deleteDoc } from '@firebase/firestore';
import db from './../../firebase';

import { useStateValue } from './../../StateProvider';

function Body() {

    const [{ user }, dispatch] = useStateValue();

// useEffect(
//     () => {
//         if ( !== '') {
//         const docRef = doc(db, "users", user.uid);
//         const payload = { owner: user.displayName + ': ' + user.email};
//         setDoc(docRef, payload);
//         }
//     }, []);

    useEffect(
        () => {
            async function userAccount() {
                const docRef = doc(db, user.uid, "account details");
                const docSnap = await getDoc(docRef);

                if(docSnap.exists()) {
                    console.log("User account exists: ", docSnap.data());
                } else {
                    console.log("Creating user account: ");
                    const payload = { owner: user.displayName, email: user.email};
                    setDoc(docRef, payload);
                }
            }

            userAccount()
            },
        []
    );

    return (
        <div className="body">
               <Todo />
        </div>
    )
}

export default Body
