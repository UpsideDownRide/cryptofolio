import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Portfolio from '../Portfolio/Portfolio'
import Login from '../Login/Login'
import { Container } from 'semantic-ui-react'

const main = () => (
    <Container fluid style={{paddingTop: "40px" }}>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/login" component={Login} />
        </Switch>
    </Container>
)

export default main