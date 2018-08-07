import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import ROUTES from 'common/constants/routes'


const NavItem = ({ name, children, isActiveItem, handleItemClick, ...props }) => (
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

export default class NavigationBar extends Component {
    state = { activeItem: '' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    isActiveItem = (string) => {
        return (string === this.state.activeItem)
    }

    render() {
        return (
            <Segment inverted>
                <Menu as='nav' className={style.navbar} fixed='top' inverted>
                    <NavItem name='landing' header position='left' handleItemClick={this.handleItemClick} isActiveItem={this.isActiveItem}>
                        CryptoHaven
                    </NavItem>
                    <NavItem name='dashboard' handleItemClick={this.handleItemClick} isActiveItem={this.isActiveItem} />
                    <NavItem name='transactions' handleItemClick={this.handleItemClick} isActiveItem={this.isActiveItem} />
                    <NavItem name='login' handleItemClick={this.handleItemClick} isActiveItem={this.isActiveItem}
                        position='right' />
                </Menu>
            </Segment>
        )
    }
}