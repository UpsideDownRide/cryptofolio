import React from 'react'
import { Segment, Icon, Button, Container, Grid } from 'semantic-ui-react'
import Modal from './Modal'
import TransactionTableContainer from './TransactionTable/TransactionTableContainer';

export default () => (
    <Container as="section">
        <Grid>
            <Grid.Row>

            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Button.Group attached='top'>
                        <Modal trigger={
                            <Button positive><Icon name='plus' />Add Transaction</Button>}>
                        </Modal>
                        <Button primary><Icon name='edit' />Edit Transactions</Button>
                    </Button.Group>
                    <Segment attached>
                        <TransactionTableContainer />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
)