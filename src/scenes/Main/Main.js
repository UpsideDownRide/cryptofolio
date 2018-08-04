import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Transactions from '../Transactions/Transactions'
import Login from '../Login/Login'
import style from './Main.module.css'
import './semanticSegment-override.css'
import LandingPage from '../LandingPage/LandingPage';

const Main = () => (
    <main className={style.wrapper}>
        <div className={style.content}>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/transactions" component={Transactions} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </div>
    </main>
)

export default Main