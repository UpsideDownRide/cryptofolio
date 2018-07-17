import React from 'react'
import style from './Portfolio.module.css'
import TransactionTablePane from './TransactionTablePane'
import data from 'common/mockData/transactionTable'
import { Segment, Icon, Button, Container, Grid } from 'semantic-ui-react'

export default () => (
    <Container as="section">
        <Grid>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Button.Group attached='top'>
                        <Button positive><Icon name='plus' />Add Transaction</Button>
                        <Button primary><Icon name='edit' />Edit Transactions</Button>
                    </Button.Group>
                    <Segment attached>
                        <TransactionTablePane data={data}>Table with history</TransactionTablePane>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
)