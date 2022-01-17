import React from 'react'
import './Header.css'

import Logout from './../Logout/Logout'

import { Avatar } from '@material-ui/core' 
import { useStateValue } from './../../StateProvider'

function Header() {

    const [{ user }, dispatch] = useStateValue();

    console.log("header user:");
    console.log(user);

    return (
        <div className="header">
            <div className="header__left">
                <div className="header__option">
                    <Avatar src={user.photoURL}/>
                </div>
                <div className="header__option">
                    {user.displayName}
                </div>
                <div className="header__option__uid">
                    User ID: {user.uid}
                </div>
            </div>
            <div className="header__right">
                <Logout />
            </div>     
        </div>
    )
}

export default Header
