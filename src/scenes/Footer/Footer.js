import React from 'react'
import { Segment, Container } from 'semantic-ui-react'

const Footer = () => {
    return (
        <Segment as="footer" inverted style={{ borderRadius: 0, marginTop: 0 }}>
            <Container textAlign="center">The best ever cryptofolio</Container>
        </Segment>
    )
}

export default Footer