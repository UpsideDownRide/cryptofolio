import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Transactions from '../Transactions/Transactions'
import Login from '../Login/Login'
import { Container } from 'semantic-ui-react'

const main = () => (
    <Container fluid style={{paddingTop: "40px", flex: 1}}>
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/login" component={Login} />
        </Switch>
    </Container>
)

export default main