import React from 'react'
import PropTypes from 'prop-types'
import style from './GraphPane.module.css'
import Treemap from 'components/TreeMap/TreeMap-Recharts'
import Areachart from 'components/AreaChart/AreaChart'
import { Segment } from 'semantic-ui-react'

const DATA = {
    'area': [
        { name: 'A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'G', uv: 3490, pv: 4300, amt: 2100 }],
    'treeMap': [
        { name: 'BTC', size: 5000 },
        { name: 'ETH', size: 3000 },
        { name: 'ADA', size: 2000 },
        { name: 'AMB', size: 1000 },
        { name: 'DOGE', size: 1000 }]
}

const GRAPHS = {
    'area': Areachart,
    'treeMap': Treemap
}

const graphPane = ({name, chart, ...props}) => {
    const title = name || 'Value of each currency in USD'
    const Chart = GRAPHS[chart]
    return (
        <Segment>
            <div className={style.title}>
                <span className={style.titlename}>{title}</span>
            </div>
            <div className={style.content}>
                <Chart data={props.data || DATA[chart]} {...props}/>
            </div>
        </Segment>
    )
}

graphPane.propTypes = {
    chart: PropTypes.string.isRequired,
    name: PropTypes.string,
}

export default graphPane
