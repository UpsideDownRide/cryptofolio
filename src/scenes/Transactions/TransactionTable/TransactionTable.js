import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Table from 'components/Table/Table'

const TransactionTable = (props) => ( 
    <Table {...props} />
)

const mapStateToProps = (state) => ({
    data: state.transactions.data,
    columns: state.transactions.settings
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionTable)

