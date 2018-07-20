import React from 'react'
import PropTypes from 'prop-types'
import style from './GraphPane.module.css'
import Treemap from 'components/TreeMap/TreeMap-Recharts'
import Areachart from 'components/AreaChart/AreaChart'
import { Segment } from 'semantic-ui-react'

const data = [
    { name: 'BTC', size: 5000 },
    { name: 'ETH', size: 3000 },
    { name: 'ADA', size: 2000 },
    { name: 'AMB', size: 1000 },
    { name: 'DOGE', size: 1000 },
];


const GRAPHS = {
    'area': Areachart,
    'treeMap': Treemap
}

const graphPane = (props) => {
    const name = props.name || 'Value of each currency in USD'
    const Chart = GRAPHS[props.chart]
    return (
        <Segment>
            <div className={style.title}>
                <span className={style.titlename}>{name}</span>
            </div>
            <div className={style.content}>
                <Chart treeMapData={data} {...props}/>
            </div>
        </Segment>
    )
}

graphPane.propTypes = {
    chart: PropTypes.string.isRequired,
    name: PropTypes.string,
}

export default graphPane
