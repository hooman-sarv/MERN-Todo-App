import React from 'react'
import {connect} from "react-redux";
import * as mutations from '../store/mutations'
import {requestAuthenticateUser} from "../store/mutations";

const LoginComponent = ({authenticateUser,authenticated}) => {
    return (
        <div>
            <h2>Please login</h2>
            <form onSubmit={authenticateUser}>
                <input type="text" name="username" placeholder="username" defaultValue="Hooman"/>
                <input type="password" name="password" placeholder="password" defaultValue="sarv"/>
                {authenticated === mutations.NOT_AUTHENTICATED
                    ? <p> login is incorrect </p>
                    : null
                }
                <button type="submit">Login</button>
            </form>
        </div>
    )
}


const mapStateToProps = ({session}) => ({
    authenticated : session.authenticated
})

const mapDispatchToProps = (dispatch) => ({
    authenticateUser(e) {
        e.preventDefault()
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        dispatch(requestAuthenticateUser(username,password))
    }
})

export const ConnectedLogin = connect(mapStateToProps,mapDispatchToProps)(LoginComponent)