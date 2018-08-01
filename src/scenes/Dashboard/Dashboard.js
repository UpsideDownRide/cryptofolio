import React from 'react'
import TextPane from './TextPane/TextPane'
import BalanceTablePane from './BalanceTablePane/BalanceTablePane'
import { Container, Grid } from 'semantic-ui-react'
import TotalValuePane from './TextPane/TotalValuePane';
import ValueTreeMap from './GraphPane/ValueTreeMap'
import CurrentBitcoinPrice from './TextPane/CurrentBitcoinPrice';
import BitcoinPrice from './GraphPane/BitcoinPrice';
import ExchangesTreeMap from './GraphPane/ExchangesTreeMap';

const Dashboard = () => (
    <Container fluid as="section">
        <Grid doubling columns={4} padded='horizontally' style={{ paddingTop: "0.5em" }}>
            <Grid.Row style={{ paddingBottom: 0 }}>
                <Grid.Column><TotalValuePane /></Grid.Column>
                <Grid.Column><CurrentBitcoinPrice /></Grid.Column>
                <Grid.Column><TextPane /></Grid.Column>
                <Grid.Column><TextPane /></Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingTop: "0.25em", paddingBottom: "0.5em" }}>
                <Grid.Column><TextPane /></Grid.Column>
                <Grid.Column><TextPane /></Grid.Column>
                <Grid.Column><TextPane /></Grid.Column>
                <Grid.Column><TextPane /></Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingTop: "0.5em" }} columns={3}>
                <Grid.Column><ExchangesTreeMap /></Grid.Column>
                <Grid.Column><ValueTreeMap /></Grid.Column>
                <Grid.Column><BitcoinPrice /></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column></Grid.Column>
                <Grid.Column style={{ flex: 1 }}>
                    <BalanceTablePane />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
)

export default Dashboard
