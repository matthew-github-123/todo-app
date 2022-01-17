import React from 'react'
import './Logout.css'
import { Button } from '@material-ui/core';

import { useStateValue } from './../../StateProvider';
import { actionTypes } from '../../reducer';

function Logout() {

    const [{ user }, dispatch] = useStateValue();

    const logout = () => {

        dispatch({
            type: actionTypes.SET_USER,
            user: null,
        });

        console.log("user logged out: ");
        console.log(user);
    }

    return (
        <div className="logout">
            <Button variant="contained" onClick={logout}>Logout</Button>
        </div>
    )
}

export default Logout
