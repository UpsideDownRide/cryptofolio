import React from 'react'
import { Grid, Segment, Header, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { logoutUser } from 'common/user/userActions'

const LogoutPage = (props) => (
    <div className='logout-box'>
        <Grid padded textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ minWidth: "22em" }}>
                <Segment.Group>
                    <Segment>
                        <Header>Are you sure?</Header>
                    </Segment>
                    <Segment>
                        <Button primary onClick={props.logout}>Logout</Button>
                        <Button color='red' onClick={props.history.goBack}>Cancel</Button>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
        </Grid>
    </div>
)

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(LogoutPage)
