import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import ROUTES from 'common/constants/routes'
import { connect } from 'react-redux'
import { isUserLoggedIn } from 'common/user/userSelectors'
import { withRouter } from 'react-router-dom'
import { compose } from 'lodash/fp'

class NavigationBar extends Component {
    state = { activeItem: '' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    isActiveItem = (string) => {
        return (string === this.state.activeItem)
    }

    HandledNavItem = props => <NavItem handleItemClick={this.handleItemClick} isActiveItem={this.isActiveItem} {...props} />

    render() {
        const HandledNavItem = this.HandledNavItem
        const isLoggedIn = this.props.isLoggedIn
        return (
            <Segment inverted>
                    <Menu as='nav' className={style.navbar} fixed='top' inverted>
                        <HandledNavItem name='landing' header position='left'>
                            CryptoHaven
                    </HandledNavItem>
                        <div style={{ display: "flex" }}>
                            <HandledNavItem name='dashboard' />
                            <HandledNavItem name='transactions' />
                            {!isLoggedIn && <HandledNavItem name='login' />}
                            {isLoggedIn && <HandledNavItem name='logout' />}
                        </div>
                    </Menu>
            </Segment>
        )
    }
}

const NavItem = ({ isActiveItem, handleItemClick, name, children, ...props }) => (
    <Menu.Item
        exact
        name={name}
        as={NavLink}
        to={ROUTES[name]}
        active={isActiveItem({ name })}
        onClick={handleItemClick}
        {...props}
    >
        {children}
    </Menu.Item>
)

const mapStateToProps = (state) => ({
    isLoggedIn: isUserLoggedIn(state)
})

export default compose(
    withRouter,
    connect(mapStateToProps)
)(NavigationBar)
