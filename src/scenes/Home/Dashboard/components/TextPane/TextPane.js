import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './TextPane.module.css'

const convertToPercent = (num) => (Math.round(num*10000)/100).toString() + '%'

const textPane = () => {
    const name = "Total value of coins:"
    const number = convertToPercent(0.05329)
    const primary = '4768 PLN'
    const secondary = "0.79 BTC"
    const numberClass = number > 0 ? style.red : style.green
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
