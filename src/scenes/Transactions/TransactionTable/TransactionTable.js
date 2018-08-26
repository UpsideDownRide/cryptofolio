import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { columnsSettings, defaultSorting } from '../TransactionTable/TransactionTableSettings'
import Table from 'components/Table/Table'
import { getTransactions } from 'common/transactions/transactionsSelectors';
import { Container, Segment } from 'semantic-ui-react';

// TODO: Reactive design for mobile - current table is not good for narrow screens, should probably design different layout for them

const TransactionTable = ({data, ...props}) => (
    <Container style={{width: "100%", margin: 0}}>
        {data && <Table {...props} data={data} columns={columnsSettings} defaultSorted={defaultSorting}/>}
        {!data && <Segment attached>Enter a transaction</Segment>}
    </Container>
)

const mapStateToProps = (state) => ({
    data: getTransactions(state)
})

export default connect(mapStateToProps)(TransactionTable)

