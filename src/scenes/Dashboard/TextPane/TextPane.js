import React from 'react'
import PropTypes from 'prop-types'
import style from './TextPane.module.css'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'

export const TextPane = ({ title, topRight, botLeft, botRight, loading, loadingMessage }) => (
    <Dimmer.Dimmable className={style.segment} as={Segment} blurring dimmed={loading}>
        <Dimmer active={loading} inverted><Loader indeterminate size="tiny">{loading && loadingMessage}</Loader></Dimmer>
        <div className={style.title}>
            <span className={style.name}>{title}</span>
            <span className={style.number}>{topRight}</span>
        </div>
        <div className={style.content}>
            <span className={style.primary}>{botLeft}</span>
            <span className={style.secondary}>{botRight}</span>
        </div>
    </Dimmer.Dimmable>
)

TextPane.propTypes = {
    title: PropTypes.string,
    topRight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    botLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    botRight: PropTypes.string,
    loading: PropTypes.bool,
    loadingMessage: PropTypes.string,
}


export default TextPane
