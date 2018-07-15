import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Portfolio from '../Portfolio/Portfolio'
import Login from '../Login/Login'

const main = () => (
    <React.Fragment>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/login" component={Login} />
        </Switch>
    </React.Fragment>
)

export default main