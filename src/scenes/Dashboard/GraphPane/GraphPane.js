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

const graphPane = ({ name, chart, loading, loadingMessage, data, ...props }) => {
    const title = name || ''
    const Chart = GRAPHS[chart]
    return (
        <Dimmer.Dimmable style={{width: "100%", height: "100%"}} as={Segment} blurring dimmed={loading}>
            <Dimmer active={loading} inverted>
                <Loader indeterminate size="medium">
                    {loading && loadingMessage}
                </Loader>
            </Dimmer>
            <div className={style.title}>
                <span className={style.titlename}>{title}</span>
            </div>
            <div className={style.content}>
                {data && <Chart data={data} {...props} />}
            </div>
        </Dimmer.Dimmable>
    )
}

graphPane.propTypes = {
    chart: PropTypes.string.isRequired,
    name: PropTypes.string,
    loading: PropTypes.bool,
    loadingMessage: PropTypes.string,
}

export default graphPane
