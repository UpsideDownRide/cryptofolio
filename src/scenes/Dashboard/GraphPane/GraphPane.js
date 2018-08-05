import React from 'react'
import PropTypes from 'prop-types'
import style from './GraphPane.module.css'
import Treemap from 'components/Charts/TreeMap/TreeMap'
import LineChart from 'components/Charts/Line/LineChart'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import TitleText from '../TitleText'

const GRAPHS = {
    'line': LineChart,
    'treeMap': Treemap
}
const GraphPane = ({ name, chart, loading, loadingMessage, data, ...props }) => {
    const title = name || ''
    const Chart = GRAPHS[chart]
    return (
        <Dimmer.Dimmable className={style.segment} as={Segment} blurring dimmed={loading}>
            <Dimmer active={loading} inverted>
                <Loader indeterminate size="medium">
                    {loading && loadingMessage}
                </Loader>
            </Dimmer>
            <TitleText text={title} /> 
            <div className={style.content}>
                {data && <Chart data={data} {...props} />}
            </div>
        </Dimmer.Dimmable>
    )
}

GraphPane.propTypes = {
    chart: PropTypes.string.isRequired,
    name: PropTypes.string,
    loading: PropTypes.bool,
    loadingMessage: PropTypes.string,
}

export default GraphPane
