import React from 'react'
import ROUTES from 'common/constants/routes'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isUserLoggedIn } from 'common/user/userSelectors';
import returnEmptyObject from 'common/utils/returnEmptyObject';

export const NavItems = (props) => (
    <React.Fragment>
        <NavDashboard {...props} />
        <NavTransactions {...props} />
        <NavSignup {...props} />
        <NavLogin {...props} />
        <NavLogout {...props} />
    </React.Fragment>
)

export const NavLanding = ({ ...props }) => (
    <NavItem name='landing' {...props}>
        <span>CryptoHaven</span>
    </NavItem>
)

export const NavDashboard = (props) => <NavItem name='dashboard' {...props} />
export const NavTransactions = (props) => <NavItem name='transactions' {...props} />
const Login = ({ isLoggedIn, ...props }) => !isLoggedIn ? <NavItem name='login' {...props}><span style={{paddingRight: "0.5em"}}>Login</span><Icon fitted color="teal" name="sign in" /></NavItem> : null
const Signup = ({ isLoggedIn, ...props }) => !isLoggedIn ? <NavItem name='signup' {...props}><span style={{paddingRight: "0.5em"}}>Sign up</span><Icon fitted color="green" name="add user" /></NavItem> : null
const Logout = ({ isLoggedIn, ...props }) => isLoggedIn ? <NavItem name='logout' {...props}></NavItem> : null

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

const mapStateToProps = (state) => ({
    isLoggedIn: isUserLoggedIn(state)
})

export const NavLogin = connect(mapStateToProps, returnEmptyObject)(Login)
export const NavSignup = connect(mapStateToProps, returnEmptyObject)(Signup)
export const NavLogout = connect(mapStateToProps, returnEmptyObject)(Logout)

