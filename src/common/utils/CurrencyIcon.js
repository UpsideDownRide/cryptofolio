import React from 'react'
import PropTypes from 'prop-types'

const CurrencyIcon = (props) => {
    const name = props.name.toLowerCase()
    const size = props.size || 16
    const style = {width: size+'px', height: size+'px'}
    const className = `icon crypto-icon-128 crypto-icon-color crypto-icon-color-${name}`
    return (
        <React.Fragment>
            <i style={{...style, ...props.style}} className={className} />
        </React.Fragment >
    )
}

CurrencyIcon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number
}

export default CurrencyIcon