import React from 'react'
import PropTypes from 'prop-types'
import style from './GraphPane.module.css'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import TitleText from '../TitleText'

const GraphPane = ({ title, loading, loadingMessage, children }) => {
    return (
        <Dimmer.Dimmable className={style.segment} as={Segment} blurring dimmed={loading}>
            <Dimmer active={loading} inverted>
                <Loader indeterminate size="medium">
                    {loading && loadingMessage}
                </Loader>
            </Dimmer>
            <TitleText text={title} /> 
            <div className={style.content}>
                {children}
            </div>
        </Dimmer.Dimmable>
    )
}

GraphPane.propTypes = {
    name: PropTypes.string,
    loading: PropTypes.bool,
    loadingMessage: PropTypes.string,
}

export default GraphPane
