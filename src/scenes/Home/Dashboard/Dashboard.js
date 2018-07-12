import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Dashboard.module.css'
import TextPane from './components/TextPane/TextPane'

const Dashboard = () => {
    return (
        <div className={style.body}>
            <TextPane/>
            <TextPane/>
        </div>
    )
}

export default Dashboard
