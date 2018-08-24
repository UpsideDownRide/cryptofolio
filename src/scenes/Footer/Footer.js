import React from 'react'
import { Segment, Container } from 'semantic-ui-react'

const Footer = () => {
    return (
        <Segment as="footer" inverted style={{ borderRadius: 0, marginTop: 0 }}>
            <Container textAlign="center">Made with ☕ in Warsaw</Container>
        </Segment>
    )
}

export default Footer