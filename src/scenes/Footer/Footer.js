import React from 'react'
import { Segment, Container } from 'semantic-ui-react'

const Footer = () => {
    return (
        <Segment inverted style={{ borderRadius: 0 }}>
            <Container as="footer" textAlign="center">The best ever cryptofolio</Container>
        </Segment>
    )
}

export default Footer