import React from 'react'
import ROUTES from 'common/constants/routes'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export const NavItems = ({ isLoggedIn, ...props }) => (
    <React.Fragment>
        <NavDashboard {...props} />
        <NavTransactions {...props} />
        { isLoggedIn ? null : <NavSignup {...props} /> }
        { isLoggedIn ? null : <NavLogin {...props} /> }
        { isLoggedIn ? <NavLogout {...props} /> : null }
    </React.Fragment>
)

NavItems.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export const NavLanding = ({ ...props }) => <NavItem name='landing' {...props}><span>CryptoHaven</span></NavItem>
export const NavDashboard = (props) => <NavItem name='dashboard' {...props} />
export const NavTransactions = (props) => <NavItem name='transactions' {...props} />
export const NavSignup = (props) => <NavItem name='signup' {...props}><span style={{ paddingRight: "0.5em" }}>Sign up</span><Icon fitted color="green" name="add user" /></NavItem> 
export const NavLogin = (props) => <NavItem name='login' {...props}><span style={{ paddingRight: "0.5em" }}>Login</span><Icon fitted color="teal" name="sign in" /></NavItem>
export const NavLogout = (props) => <NavItem name='logout' {...props}><span style={{ paddingRight: "0.5em" }}>Logout</span><Icon fitted color="teal" name="sign out" /></NavItem>

const NavItem = ({ name, children, ...props }) => (
    <Menu.Item
        exact
        name={name}
        as={NavLink}
        to={ROUTES[name]}
        {...props}
    >
        {children}
    </Menu.Item>
)
