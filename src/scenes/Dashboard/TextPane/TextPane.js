import React from 'react'
import PropTypes from 'prop-types'
import style from './TextPane.module.css'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'

export const TextPane = ({ title, topRight, botLeft, botRight, loading, loadingMessage }) => (
    <Dimmer.Dimmable className={style.segment} as={Segment} blurring dimmed={!!loading}>
        <Dimmer active={!!loading} inverted><Loader indeterminate size="tiny">{loading && loadingMessage}</Loader></Dimmer>
        <div className={style.title}>
            <span className={style.titlename}>{title}</span>
            <span className={style.titlenumber}>{topRight}</span>
        </div>
        <div className={style.content}>
            <span className={style.contentprimary}>{botLeft}</span>
            <span className={style.contentsecondary}>{botRight}</span>
        </div>
    </Dimmer.Dimmable>
)

TextPane.propTypes = {
    title: PropTypes.string,
    topRight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    botLeft: PropTypes.string,
    botRight: PropTypes.string,
    loading: PropTypes.bool,
    loadingMessage: PropTypes.string,
}


export default TextPane
