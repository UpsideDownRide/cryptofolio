import React from 'react'
import PropTypes from 'prop-types'
import style from './NavBar.module.css'

const navBar = () => {
    const notImplemented = () => alert('not implemented')
    return (
        <nav className={style.nav}>
            <ul className={style.ul}>
                <li>Cryptofolio</li>
                <li>
                    <a href="#" onClick={notImplemented} className={style.a}>Login</a>
                </li>
            </ul>
        </nav>
    )
}

export default navBar