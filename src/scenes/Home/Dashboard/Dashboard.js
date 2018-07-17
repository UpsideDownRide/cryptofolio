import React from 'react'
import style from './Dashboard.module.css'
import TextPane from './components/TextPane/TextPane'
import GraphPane from './components/GraphPane/GraphPane'
import BalanceTablePane from './components/BalanceTablePane/BalanceTablePane'
import BalanceTableContainer from './components/BalanceTablePane/BalanceTableContainer'
import { Container, Grid, GridRow } from 'semantic-ui-react'
import balanceData from 'common/mockData/balanceTable'
import { Segment } from 'semantic-ui-react'

const Dashboard = () => {
    return (
        <Container fluid as="section">
            <Grid doubling columns={4} padded='horizontally' style={{ paddingTop: "0.5em" }}>
                <Grid.Row style={{ paddingBottom: 0 }}>
                    <Grid.Column>
                        <TextPane
                            title="Total value of coins:"
                            value={123} currency="GBP"
                            percentChange={0.021}
                            cryptoValue={0.28}
                            cryptoCurrency="ETH"
                        />
                    </Grid.Column>
                    <Grid.Column><TextPane /></Grid.Column>
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
                    <Grid.Column><GraphPane chart='treeMap' /></Grid.Column>
                    <Grid.Column><GraphPane chart='treeMap' /></Grid.Column>
                    <Grid.Column><GraphPane chart='area' /></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column style={{ flex: 1 }}>
                            <BalanceTableContainer />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default Dashboard
