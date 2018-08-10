import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import tableSettings from '../TransactionTable/TransactionTableSettings'
import Table from 'components/Table/Table'
import { getTransactions } from 'common/transactions/transactionsSelectors';
import { Container, Segment } from 'semantic-ui-react';

const TransactionTable = ({data, ...props}) => (
    <Container style={{width: "100%", margin: 0}}>
        {data && <Table {...props} data={data} columns={tableSettings} />}
        {!data && <Segment attached>Enter a transaction</Segment>}
    </Container>
)

const mapStateToProps = (state) => ({
    data: getTransactions(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionTable)

