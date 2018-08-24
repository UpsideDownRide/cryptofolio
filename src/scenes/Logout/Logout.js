import React from 'react'
import { Grid, Segment, Header, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { logoutUser } from 'common/user/userActions'
import returnEmptyObject from 'common/utils/returnEmptyObject'
import PropTypes from 'prop-types'
import ROUTES from 'common/constants/routes'

const handleLogout = (logoutUser, history) => () => logoutUser().then(() => history.push(ROUTES.landing))

const LogoutPage = ({ logoutUser, history }) => (
    <div className='logout-box'>
        <Grid padded textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ minWidth: "22em" }}>
                <Segment.Group>
                    <Segment>
                        <Header>Are you sure?</Header>
                    </Segment>
                    <Segment>
                        <Button primary onClick={handleLogout(logoutUser, history)}>Logout</Button>
                        <Button color='red' onClick={history.goBack}>Cancel</Button>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
        </Grid>
    </div>
)

LogoutPage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default compose(
    withRouter,
    connect(returnEmptyObject, mapDispatchToProps)
)(LogoutPage)
