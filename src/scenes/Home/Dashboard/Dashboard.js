import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Dashboard.module.css'
import TextPane from './components/TextPane/TextPane'
import TreeMap from './components/TreeMap/TreeMap-Recharts'

const treeMapSettings = {
    width: 400,
    height: 220,
    margin: {
        top: 0,
        left: 30,
        right: 40,
        bottom: 0,
    },
}

const Dashboard = () => {
    return (
        <div className={style.body}>
            <TextPane/>
            <TextPane/>
            <TextPane/>
            <TextPane/>
            <TextPane/>
            <TreeMap {...treeMapSettings} />
        </div>
    )
}

export default Dashboard
