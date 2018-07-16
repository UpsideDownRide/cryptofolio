import React from 'react'
import PropTypes from 'prop-types'
import { goodRound } from './random';
import { padDecimal } from './padNumber';

const SIGNS = {positive: "▲", negative: "▼"}


const StylePercent = props => {
    const number = props.value
    const isPositive = number > 0
    const numColor = isPositive ? "green" : "red"
    const sign = isPositive ? SIGNS.positive : SIGNS.negative
    const styled = padDecimal(goodRound(number*100, 2), 2)+"% "+sign
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