import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Navigation = () => (
    <div>
        <Link to="/dashboard" >
            <h1>My MERN Stack App</h1>
        </Link>
    </div>
)
export const ConnectedNavigation = connect(state => state) (Navigation)