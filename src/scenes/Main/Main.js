import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Transactions from '../Transactions/Transactions'
import Login from '../Login/Login'
import { Container } from 'semantic-ui-react'
import style from './Main.module.css'
import './semanticSegment-override.css'

const Main = () => (
    <Container fluid className={style.main}>
        <div className={style.content}>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/transactions" component={Transactions} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    </Container >
)

export default Main