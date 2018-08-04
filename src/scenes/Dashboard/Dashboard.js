import React from 'react'
import BalanceTablePane from './BalanceTablePane/BalanceTablePane'
import { Grid } from 'semantic-ui-react'
import TotalValuePane from './TextPane/TotalValuePane';
import ValueTreeMap from './GraphPane/ValueTreeMap'
import CurrentBitcoinPrice from './TextPane/CurrentBitcoinPrice';
import BitcoinPrice from './GraphPane/BitcoinPrice';
import ExchangesTreeMap from './GraphPane/ExchangesTreeMap';
import { FirstTradePane, LastTradePane } from './TextPane/TradeTimePanes';

const Dashboard = () => (
    <Grid relaxed doubling stackable columns={4} padded>
        <Grid.Row as='section'>
            <Grid.Column><TotalValuePane /></Grid.Column>
            <Grid.Column><FirstTradePane /></Grid.Column>
            <Grid.Column><LastTradePane /></Grid.Column>
            <Grid.Column><CurrentBitcoinPrice /></Grid.Column>
        </Grid.Row>
        <Grid.Row as='section'>
            <Grid.Column><TotalValuePane /></Grid.Column>
            <Grid.Column><FirstTradePane /></Grid.Column>
            <Grid.Column><LastTradePane /></Grid.Column>
            <Grid.Column><CurrentBitcoinPrice /></Grid.Column>
        </Grid.Row>
        <Grid.Row as='section'>
            <Grid.Column><BitcoinPrice /></Grid.Column>
            <Grid.Column><ExchangesTreeMap /></Grid.Column>
            <Grid.Column><ValueTreeMap /></Grid.Column>
            <Grid.Column><BitcoinPrice /></Grid.Column>
        </Grid.Row>
        <Grid.Row as='section' columns={1}>
            <Grid.Column><BalanceTablePane /></Grid.Column>
        </Grid.Row>
    </Grid>
)

export default Dashboard
