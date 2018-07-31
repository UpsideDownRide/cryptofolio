import React from 'react'
import PropTypes from 'prop-types'
import style from './GraphPane.module.css'
import Treemap from 'components/TreeMap/TreeMap-Recharts'
import Areachart from 'components/AreaChart/AreaChart'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import DATA from 'common/mockData/graphs'

const GRAPHS = {
    'area': Areachart,
    'treeMap': Treemap
}

const graphPane = ({ name, chart, loading, loadingMessage, data, mock, ...props }) => {
    const title = name || 'Value of each currency in USD'
    const Chart = GRAPHS[chart]
    const chartData = mock ? DATA[chart] : data
    return (
        <Dimmer.Dimmable as={Segment} blurring dimmed={loading}>
            <Dimmer active={!!loading} inverted>
                <Loader indeterminate size="mini">
                    {loading && loadingMessage}
                </Loader>
            </Dimmer>
            <div className={style.title}>
                <span className={style.titlename}>{title}</span>
            </div>
            <div className={style.content}>
                {chartData && <Chart data={chartData} {...props} />}
            </div>
        </Dimmer.Dimmable>
    )
}

graphPane.propTypes = {
    chart: PropTypes.string.isRequired,
    name: PropTypes.string,
}

export default graphPane
