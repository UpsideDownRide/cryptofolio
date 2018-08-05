import React from 'react'
import { Segment, Icon, Button, Grid } from 'semantic-ui-react'
import Modal from './Modal'
import TransactionTable from './TransactionTable/TransactionTable';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper'

export default () => (
    <ContentWrapper>
        <Grid>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row as='section'>
                <Grid.Column>
                    <Button.Group attached='top'>
                        <Modal trigger={
                            <Button positive><Icon name='plus' />Add Transaction</Button>}>
                        </Modal>
                        <Button primary disabled><Icon name='edit' />Edit Transactions</Button>
                    </Button.Group>
                    <Segment attached style={{ padding: 0 }}>
                        <TransactionTable />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </ContentWrapper>
)