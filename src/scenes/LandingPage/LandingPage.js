import React from 'react'
import { Container, Segment, Header, Icon } from 'semantic-ui-react';

const LandingPage = () => {
    return (
        <Container as="section">
            <Segment>
                <Header>
                <Icon name="anchor" circular />
                <Header.Content>Welcome to Cryptohaven</Header.Content>
                </Header>

            </Segment>
        </Container>
    )
}

export default LandingPage