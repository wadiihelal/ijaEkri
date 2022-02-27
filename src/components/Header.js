import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';


const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const getUserGroup = async () => {





        const user = await Auth.currentAuthenticatedUser();

        // the array of groups that the user belongs to
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"]
        console.log(groups)
        if (groups === undefined)
            return 'not an admin '
        else
            return groups[0]
    }



    useEffect(() => {
        getUserGroup().then((e) => {
            if (e === 'Admin') {
                setIsAdmin(true)
            }
        })


    }, [isAdmin])

    return (
        <header className="main-head">
            <nav>
                <Link to="/">
                    <img src="./test.png" width="40"
                        height="50" />
                </Link>
                <h1 id="logo"> Ija Ekri</h1>
                <ul>
                    <li>

                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/books">Houses</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                        <Link to="/checkout">Checkout</Link>
                    </li>
                    {
                        isAdmin ? <li>
                            <Link to="/admin">Admin</Link>
                        </li> : null

                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header
