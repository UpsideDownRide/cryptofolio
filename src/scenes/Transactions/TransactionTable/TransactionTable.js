import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import tableSettings from '../TransactionTable/TransactionTableSettings'
import Table from 'components/Table/Table'
import { getTransactions } from 'common/selectors/TransactionsSelectors';

const TransactionTable = (props) => ( 
    <Table {...props} columns={tableSettings}/>
)

const mapStateToProps = (state) => ({
    data: getTransactions(state) 
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionTable)

