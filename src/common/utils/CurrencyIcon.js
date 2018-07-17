import React from 'react'
import PropTypes from 'prop-types'

const CurrencyIcon = (props) => {
    const name = props.name.toLowerCase()
    const size = props.size || 16
    return (
        <React.Fragment>
            <i style={{width: size+'px', height: size+'px'}} className={`icon crypto-icon-128 crypto-icon-color crypto-icon-color-${name}`}></i>
        </React.Fragment >
    )
}

CurrencyIcon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number
}

export default CurrencyIcon