import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Transactions from '../Transactions/Transactions'
import Login from '../Login/Login'
import style from './Main.module.css'
import './semanticSegment-override.css'
import LandingPage from '../LandingPage/LandingPage';
import SignUp from '../Login/SignUp/SignUp'
import NotFound404 from 'components/NotFound404'

const Main = () => (
    <main className={style.wrapper}>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/transactions" component={Transactions} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route component={NotFound404} />
            </Switch>
    </main>
)

export default Main