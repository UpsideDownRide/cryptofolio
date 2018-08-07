import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

export default () => (
    <div style={{width: "100vw", margin: "-2em", backgroundColor: "rgb(27,28,29)"}}>
        <div style={{ margin: "10rem auto", width: "45rem", border: "white 0.5rem solid"}}>
            <Segment padded='very' inverted color='red' style={{borderRadius: 0}}>
                <Header as='h1' style={{ fontSize: "20rem", textAlign: "center" }}>404</Header>
                <Header.Subheader style={{ fontSize: "2rem", textAlign: "center" }}>Content not found</Header.Subheader>
            </Segment>
        </div>
    </div>
)
