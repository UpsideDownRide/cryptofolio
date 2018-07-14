import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Dashboard.module.css'
import TextPane from './components/TextPane/TextPane'
import GraphPane from './components/GraphPane/GraphPane'

const Dashboard = () => {
    return (
        <div className={style.body}>
            <div className={style.textPanes}>
                <TextPane />
                <TextPane />
                <TextPane />
                <TextPane />
                <TextPane />
            </div>
            <div className={style.graphPanes}>
                <GraphPane chart='treeMap'/>
                <GraphPane chart='treeMap'/>
                <GraphPane chart='areaChart'/>
                <GraphPane chart='areaChart'/>
            </div>
        </div>
    )
}

export default Dashboard
