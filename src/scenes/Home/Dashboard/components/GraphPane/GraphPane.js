import React from 'react'
import PropTypes from 'prop-types'
import style from './GraphPane.module.css'
import Treemap from 'components/TreeMap/TreeMap-Recharts'
import Areachart from 'components/AreaChart/AreaChart'
import { Segment } from 'semantic-ui-react'

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
                <Chart/>
            </div>
        </Segment>
    )
}

graphPane.propTypes = {
    chart: PropTypes.string.isRequired,
    name: PropTypes.string,
}

export default graphPane
