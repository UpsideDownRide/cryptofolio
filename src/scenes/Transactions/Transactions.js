import React from 'react'
import { Segment, Icon, Button, Grid } from 'semantic-ui-react'
import AddTransactionModal from './AddTransactionModal'
import ImportTransactionsModal from './ImportTransactionsModal'
import TransactionTable from './TransactionTable/TransactionTable';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper'

export default () => (
    <ContentWrapper>
        <Grid>
            <Grid.Row as='section'>
                <Grid.Column>
                    <Button.Group attached='top'>
                        <AddTransactionModal trigger={
                            <Button positive><Icon name='plus' />Add Transaction</Button>
                        }>
                        </AddTransactionModal>
                        <ImportTransactionsModal trigger={
                            <Button primary><Icon name='download' />Import Transactions</Button>
                        }>
                        </ImportTransactionsModal>
                    </Button.Group>
                    <Segment attached style={{ padding: 0 }}>
                        <TransactionTable />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </ContentWrapper>
)