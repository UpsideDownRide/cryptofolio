import React from 'react'
import BalanceTablePane from './BalanceTablePane/BalanceTablePane'
import { Grid } from 'semantic-ui-react'
import TotalValuePane from './TextPane/TotalValuePane';
import ValueTreeMap from './GraphPane/ValueTreeMap'
import CurrentBitcoinPrice from './TextPane/CurrentBitcoinPrice';
import BitcoinPrice from './GraphPane/BitcoinPrice';
import ExchangesTreeMap from './GraphPane/ExchangesTreeMap';
import { FirstTradePane, LastTradePane } from './TextPane/TradeTimePanes';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper'
import style from './Dashboard.module.css'
import PortfolioValue from './GraphPane/PortfolioValue'
import TotalPerformancePane from './TextPane/TotalPerformancePane'
import RecentPerformancePane from './TextPane/RecentPerformancePane';

const Dashboard = () => (
    <ContentWrapper>
        <Grid className={style.grid} doubling stackable columns={4} padded>
            <Grid.Row as='section'>
                <Grid.Column><TotalPerformancePane /></Grid.Column>
                <Grid.Column><RecentPerformancePane /></Grid.Column>
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
                <Grid.Column><PortfolioValue /></Grid.Column>
                <Grid.Column><ExchangesTreeMap /></Grid.Column>
                <Grid.Column><ValueTreeMap /></Grid.Column>
                <Grid.Column><BitcoinPrice /></Grid.Column>
            </Grid.Row>
            <Grid.Row as='section'>
                <Grid.Column width={16}><BalanceTablePane /></Grid.Column>
            </Grid.Row>
        </Grid>
    </ContentWrapper>
)

export default Dashboard
