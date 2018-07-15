import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'

const main = () => (
    <React.Fragment>
        <Switch>
            <Route exact path="/" component={Dashboard} />
        </Switch>
    </React.Fragment>
)


export default main