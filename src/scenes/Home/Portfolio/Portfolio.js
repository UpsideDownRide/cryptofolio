import React from 'react'
import style from './Portfolio.module.css'
import TransactionTablePane from './TransactionTablePane'
import data from 'common/mockData/transactionTable'
import { Container, Grid } from 'semantic-ui-react'

export default () => (
    <Container as="section">
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <TransactionTablePane data={data}>Table with history</TransactionTablePane>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
)