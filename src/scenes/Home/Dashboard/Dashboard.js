import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Dashboard.module.css'
import TextPane from './components/TextPane/TextPane'
import GraphPane from './components/GraphPane/GraphPane'
import TablePane from './components/TablePane/TablePane'

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
                <GraphPane chart='area'/>
                <GraphPane chart='area'/>
                <TablePane/>
            </div>
        </div>
    )
}

export default Dashboard
