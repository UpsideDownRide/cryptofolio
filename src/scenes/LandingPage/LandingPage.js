import React from 'react'
import { Segment, Header, Grid, Button } from 'semantic-ui-react';
import style from './LandingPage.module.css'
import ContentWrapper from 'components/ContentWrapper/ContentWrapper'

const LandingPage = () => {
    return (
        <div className={style.landing}>
            <ContentWrapper>
                <Grid centered padded relaxed='very'>
                    <Grid.Row />
                    <Grid.Row>
                        <Grid.Column />
                        <Grid.Column width={10}>
                            <Segment vertical massive padded='very'>
                                <Header inverted>
                                    <Header.Content as='h1'>
                                        Welcome to CryptoHaven<br />
                                        the safe place for you<br />
                                        and your portfolio needs
                                </Header.Content>
                                </Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column />
                        <Grid.Column width={10}>
                        <Button positive size='massive'>
                            Sign Up
                        </Button>
                        <Button primary size='massive'>
                            Demo
                        </Button>
                        </Grid.Column>
                        <Grid.Column />
                    </Grid.Row>
                    <Grid.Row />
                </Grid>
            </ContentWrapper>
        </div>
    )
}

export default LandingPage