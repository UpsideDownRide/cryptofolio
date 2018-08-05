import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

export default () => (
    <div style={{ margin: "10rem auto" }}>
        <Segment padded='very' inverted color='red'>
            <Header as='h1' style={{ fontSize: "20rem" }} dividing >404</Header>
            <Header.Subheader style={{ fontSize: "2rem", textAlign: "center" }}>Content not found</Header.Subheader>
        </Segment>
    </div>
)
