import React from 'react'
//import PropTypes from 'prop-types'
import style from './TextPane.module.css'
import StylePercent from 'common/utils/StylePercent'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'

export const TextPane = (props) => {
    const name = props.title || "Placeholder"
    const topRight = props.topRight || <StylePercent value={0.05329}/>
    const botLeft = props.botLeft || "4768 PLN"
    const botRight = props.botRight || "0.79 BTC"
    
    return (
        <Dimmer.Dimmable className={style.segment} as={Segment} blurring dimmed={!!props.loading}>
            <Dimmer active={!!props.loading} inverted><Loader indeterminate size="tiny">{props.loading && props.loadingMessage}</Loader></Dimmer>
            <div className={style.title}>
                <span className={style.titlename}>{name}</span>
                <span className={style.titlenumber}>{topRight}</span>
            </div>
            <div className={style.content}>
                <span className={style.contentprimary}>{botLeft}</span>
                <span className={style.contentsecondary}>{botRight}</span>
            </div>
        </Dimmer.Dimmable>
    )
}

export default TextPane
