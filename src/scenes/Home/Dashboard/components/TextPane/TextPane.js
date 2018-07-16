import React from 'react'
import PropTypes from 'prop-types'
import style from './TextPane.module.css'
import StylePercent from 'common/utils/StylePercent'

const textPane = (props) => {
    const name = props.title || "Placeholder"
    const number = <StylePercent value={(props.percentChange || 0.05329)}/>
    const primary = `${props.value || 4768} ${props.currency || "PLN"}`
    const secondary = `${props.cryptoValue || 0.79} ${props.cryptoCurrency || "BTC"}`
    
    return (
        <div className={style.body}>
            <div className={style.title}>
                <span className={style.titlename}>{name}</span>
                <span className={style.titlenumber}>{number}</span>
            </div>
            <div className={style.content}>
                <span className={style.contentprimary}>{primary}</span>
                <span className={style.contentsecondary}>{secondary}</span>
            </div>
        </div>
    )
}

textPane.propTypes = {
    title: PropTypes.string,
    percentChange: PropTypes.number,
    value: PropTypes.number,
    currency: PropTypes.string,
    cryptoValue: PropTypes.number,
    cryptoCurrency: PropTypes.string,
}

export default textPane
