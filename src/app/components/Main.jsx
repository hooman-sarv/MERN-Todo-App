import React from 'react'
import {Provider} from 'react-redux'
import {store} from "../store";
import {ConnectedDashborad} from "./Dashboard";
import {Router , Route} from 'react-router-dom'
import {history} from "../store/history";
import {ConnectedNavigation} from "./Navigation";
import {ConnectedTaskDetail} from "./TaskDetail"
import { Redirect} from 'react-router'
import {ConnectedLogin} from './Login'

const RouteGuard = (Componet) => ({match}) =>{
    console.info('Guard Route' , match)
    if (!store.getState().session.authenticated){
        return  <Redirect to="/" />
    }else {
        return <Componet match={match} />
    }

}

export const Main = () => (
    <Router history ={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation/>
                <Route exact path="/" component={ConnectedLogin}/>
                <Route
                    exact
                    path ="/dashboard"
                    render = {RouteGuard(ConnectedDashborad)}
                />
                <Route
                    exact
                    path="/task/:id"
                    render={RouteGuard(ConnectedTaskDetail)}
                />
            </div>
        </Provider>
    </Router>
)

