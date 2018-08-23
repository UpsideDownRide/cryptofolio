import React from 'react'
import ROUTES from 'common/constants/routes'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isUserLoggedIn } from 'common/user/userSelectors';
import returnEmptyObject from 'common/utils/returnEmptyObject';

const mapStateToProps = (state) => ({
    isLoggedIn: isUserLoggedIn(state)
})

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

export const NavLanding = (props) => (
    <NavItem name='landing' {...props}>
        CryptoHaven
    </NavItem>
)

export const NavDashboard = (props) => <NavItem name='dashboard' {...props} />
export const NavTransactions = (props) => <NavItem name='transactions' {...props} />

const Login = ({isLoggedIn, ...props}) => !isLoggedIn ? <NavItem name='login' {...props} /> : null
const Signup = ({isLoggedIn, ...props}) => !isLoggedIn ? <NavItem name='signup' {...props} /> : null
const Logout = ({isLoggedIn, ...props}) => isLoggedIn ? <NavItem name='logout' {...props} /> : null

export const NavLogin = connect(mapStateToProps, returnEmptyObject)(Login) 
export const NavSignup = connect(mapStateToProps, returnEmptyObject)(Signup) 
export const NavLogout = connect(mapStateToProps, returnEmptyObject)(Logout) 

export const NavItems = (props) => (
    <React.Fragment>
        <NavDashboard {...props} />
        <NavTransactions {...props} />
        <NavSignup {...props} />
        <NavLogin {...props} />
        <NavLogout {...props} />
    </React.Fragment>
)
