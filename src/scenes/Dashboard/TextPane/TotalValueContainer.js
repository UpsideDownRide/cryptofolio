import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import round from 'common/utils/round'

const TotalValueContainer = (props) => {
    const totalValue = `${round(props.totalValue, 2)} USD`
    return (
        <TextPane title="Total value of coins:" botLeft={totalValue} />
    )

}

const mapStateToProps = (state) => ({
    totalValue: state.balance.data.reduce((acc, el) => acc + el.value, 0),
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TotalValueContainer)
