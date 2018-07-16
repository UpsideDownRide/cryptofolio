import React from 'react'
import PropTypes from 'prop-types'

const POSITIVE_SIGN = "▲"
const NEGATIVE_SIGN = "▼"

const StylePercent = props => {
    const number = props.value
    const isPositive = number > 0
    const numColor = isPositive ? "green" : "red"
    const sign = isPositive ? POSITIVE_SIGN : NEGATIVE_SIGN
    const styled = (Math.round(number*10000)/100)+"% "+sign
    return (
        <span style={{color: numColor, ...props.style}}>
            {styled}
        </span>
    )
}

StylePercent.propTypes = {
    value: PropTypes.number.isRequired
}

export default StylePercent