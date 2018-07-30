import React from 'react'
import TextPane from './TextPane/TextPane'
import GraphPane from './GraphPane/GraphPane'
import BalanceTableContainer from './BalanceTablePane/BalanceTableContainer'
import { Container, Grid } from 'semantic-ui-react'
import TotalValueContainer from './TextPane/TotalValueContainer';
import ValueTreeMap from './GraphPane/ValueTreeMap'
import CurrentBitcoinPrice from './TextPane/CurrentBitcoinPrice';

const Dashboard = () => {
    return (
        <Container fluid as="section">
            <Grid doubling columns={4} padded='horizontally' style={{ paddingTop: "0.5em" }}>
                <Grid.Row style={{ paddingBottom: 0 }}>
                    <Grid.Column><TotalValueContainer/></Grid.Column>
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
                    <Grid.Column><GraphPane chart='treeMap' /></Grid.Column>
                    <Grid.Column><ValueTreeMap/></Grid.Column>
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
