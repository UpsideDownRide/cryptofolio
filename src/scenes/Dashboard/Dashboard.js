import React from 'react'
import TextPane from './TextPane/TextPane'
import BalanceTablePane from './BalanceTablePane/BalanceTablePane'
import { Container, Grid } from 'semantic-ui-react'
import TotalValuePane from './TextPane/TotalValuePane';
import ValueTreeMap from './GraphPane/ValueTreeMap'
import CurrentBitcoinPrice from './TextPane/CurrentBitcoinPrice';
import BitcoinPrice from './GraphPane/BitcoinPrice';
import ExchangesTreeMap from './GraphPane/ExchangesTreeMap';
import { FirstTradePane, LastTradePane } from './TextPane/TradeTimePanes';

const Dashboard = () => (
    <Container fluid as="section">
        <Grid doubling columns={4} padded='horizontally'>
            <Grid.Row doubling>
                <Grid.Column><TotalValuePane /></Grid.Column>
                <Grid.Column><FirstTradePane /></Grid.Column>
                <Grid.Column><LastTradePane /></Grid.Column>
                <Grid.Column><CurrentBitcoinPrice /></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <BalanceTablePane />
                </Grid.Column>
                <Grid.Column>
                    <BitcoinPrice />
                    <ExchangesTreeMap />
                    <ValueTreeMap />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
)

export default Dashboard
