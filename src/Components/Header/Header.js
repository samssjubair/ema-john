import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import "./Header.css"

const Header=()=>{
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const history= useHistory();
    const handleLoginClick=()=>{
        history.push('/login');
    }
    return(
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/order">Order Review</Link>
                <Link to="/manage">Manage Inventory</Link>
                {
                    loggedInUser.email? <button onClick={()=>setLoggedInUser({})}>Log Out</button>: <button onClick={handleLoginClick}>Log In</button>
                }
            </nav>
        </div>
    )
}

export default Header;