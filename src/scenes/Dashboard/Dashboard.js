import React from 'react'
import BalanceTablePane from './BalanceTablePane/BalanceTablePane'
import { Grid, Responsive } from 'semantic-ui-react'
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
import TotalTrades from './TextPane/TotalTrades'
import TradesLastMonth from './TextPane/TradesLastMonth';

const ResponsiveGridColumn = ({ children, ...props }) => <Responsive as={Grid.Column} {...props}>{children}</Responsive>

//TODO: Correct the breakpoints in dashboard so that it doesn't look so ugly at around 1k px wide

const Dashboard = () => (
    <ContentWrapper>
        <Grid className={style.grid} doubling columns={4} padded>
            <Grid.Row as='section'>
                <Grid.Column><TotalPerformancePane /></Grid.Column>
                <Grid.Column><RecentPerformancePane /></Grid.Column>
                <ResponsiveGridColumn minWidth={992}><TotalTrades /></ResponsiveGridColumn>
                <ResponsiveGridColumn minWidth={992}><TradesLastMonth /></ResponsiveGridColumn>
            </Grid.Row>
            <Grid.Row as='section'>
                <Grid.Column><TotalValuePane /></Grid.Column>
                <ResponsiveGridColumn minWidth={992}><FirstTradePane /></ResponsiveGridColumn>
                <ResponsiveGridColumn minWidth={992}><LastTradePane /></ResponsiveGridColumn>
                <Grid.Column><CurrentBitcoinPrice /></Grid.Column>
            </Grid.Row>
            <Grid.Row as='section'>
                <Grid.Column><PortfolioValue /></Grid.Column>
                <ResponsiveGridColumn minWidth={992}><ExchangesTreeMap /></ResponsiveGridColumn>
                <ResponsiveGridColumn minWidth={992}><ValueTreeMap /></ResponsiveGridColumn>
                <ResponsiveGridColumn minWidth={992}><BitcoinPrice /></ResponsiveGridColumn>
                <ResponsiveGridColumn maxWidth={992}><BitcoinPrice /></ResponsiveGridColumn>
                <ResponsiveGridColumn maxWidth={992}><ExchangesTreeMap /></ResponsiveGridColumn>
                <ResponsiveGridColumn maxWidth={992}><ValueTreeMap /></ResponsiveGridColumn>
            </Grid.Row>
        </Grid>
        <Grid className={style.grid} as='section' padded>
            <Grid.Row>
                <Grid.Column width={16}><BalanceTablePane /></Grid.Column>
            </Grid.Row>
        </Grid>
    </ContentWrapper>
)

export default Dashboard
