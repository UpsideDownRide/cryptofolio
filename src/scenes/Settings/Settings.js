import React from 'react'
import { Container, Segment, Menu } from 'semantic-ui-react'
const Settings = () => {
    return (
        <Container>
            <Menu attached="top">
                <Menu.Item
                    name="User"
                />
                <Menu.Item
                    name="Lorem"
                />
                <Menu.Item
                    name="Ipsum"
                />
            </Menu>
            <Segment attached>
                Reset Password
                Delete Account
            </Segment>
        </Container>
    )
}

export default Settings
