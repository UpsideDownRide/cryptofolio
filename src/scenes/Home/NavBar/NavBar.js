import React from 'react'
import PropTypes from 'prop-types'
import style from './NavBar.module.css'
import { Link } from 'react-router-dom'

const navBar = () => (
    <header>
        <div className={style.siteName}>Cryptofolio</div>
        <nav>
            <ul className={style.ul}>
                <li><Link to='/' className={style.link}>Dashboard</Link></li>
                <li><Link to='/portfolio' className={style.link}>Portfolio</Link></li>
                <li><Link to='/login' className={style.link}>Login</Link></li>
            </ul>
        </nav>
    </header>
)

export default navBar