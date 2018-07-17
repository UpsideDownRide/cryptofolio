import React from 'react'
import TextPane from './components/TextPane/TextPane'
import GraphPane from './components/GraphPane/GraphPane'
import BalanceTableContainer from './components/BalanceTablePane/BalanceTableContainer'
import { Container, Grid } from 'semantic-ui-react'
import TotalValueContainer from './components/TextPane/TotalValueContainer';

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
                    <Grid.Column><TotalValueContainer/></Grid.Column>
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
