import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './TextPane.module.css'

const convertToPercent = (num) => (Math.round(num*10000)/100).toString() + '%'

const textPane = (props) => {
    const name = props.title || "Placeholder"
    const number = convertToPercent(props.percentChange || 0.05329)
    const primary = `${props.value || 4768} ${props.currency || "PLN"}`
    const secondary = `${props.cryptoValue || 0.79} ${props.cryptoCurrency || "BTC"}`
    const numberClass = (props.percentChange || 0.05329) > 0 ? style.green : style.red
    return (
        <div className={style.body}>
            <div className={style.title}>
                <span className={style.titlename}>{name}</span>
                <span className={[style.titlenumber, numberClass].join(' ')}>{number}</span>
            </div>
            <div className={style.content}>
                <span className={style.contentprimary}>{primary}</span>
                <span className={style.contentsecondary}>{secondary}</span>
            </div>
        </div>
    )
}

export default textPane
