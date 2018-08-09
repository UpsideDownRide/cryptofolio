import React from 'react'
import PropTypes from 'prop-types'
import goodRound from './round';
import { padDecimal } from './padNumber';

const SIGNS = {positive: "▲", negative: "▼"}


const StylePercent = ({value, style}) => {
    const isPositive = value > 0
    const numColor = isPositive ? "green" : "red"
    const sign = isPositive ? SIGNS.positive : SIGNS.negative
    const styled = padDecimal(goodRound(value*100, 2), 2)+"% "+sign
    return (
        <span style={{color: numColor, ...style}}>
            {styled}
        </span>
    )
}

StylePercent.propTypes = {
    value: PropTypes.number.isRequired
}

export default StylePercent