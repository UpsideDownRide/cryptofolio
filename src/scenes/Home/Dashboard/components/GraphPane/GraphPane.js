import React from 'react'
import PropTypes from 'prop-types'
import style from './GraphPane.module.css'
import Treemap from '../../../../../components/TreeMap/TreeMap-Recharts'
import Areachart from '../../../../../components/AreaChart/AreaChart'

const GRAPHS = {
    'areaChart': Areachart,
    'treeMap': Treemap
}

const graphPane = (props) => {
    const name = 'Value of each currency in USD'
    const Chart = GRAPHS[props.chart]
    return (
        <div className={style.body}>
            <div className={style.title}>
                <span className={style.titlename}>{name}</span>
            </div>
            <div className={style.content}>
                <Chart/>
            </div>
        </div>
    )
}

export default graphPane
