import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BalanceTablePane from './BalanceTablePane'


const BalanceTableContainer = (props) => (
    <BalanceTablePane {...props} />
)

const mapStateToProps = (store) => ({
    data: store.balance.data,
    columnSettings: store.balance.settings
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTableContainer)

