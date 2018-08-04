import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const LINKS = {
    landing: '/',
    dashboard: '/dashboard',
    transactions: '/transactions',
    login: '/login',
}

export default class NavigationBar extends Component {
    state = { activeItem: '' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const isActiveItem = (string) => string === this.state.activeItem
        return (
                <Menu as='nav' className={style.navbar} fixed='top' inverted>
                    <Menu.Item 
                        header
                        exact
                        as={NavLink}
                        to={LINKS.landing}
                        active={isActiveItem('landing')}
                        onClick={this.handleItemClick} 
                        position='left'
                    >
                        Cryptofolio
                    </Menu.Item>
                    <Menu.Item 
                        exact
                        name='dashboard'
                        as={NavLink}
                        to={LINKS.dashboard}
                        active={isActiveItem('dashboard')}
                        onClick={this.handleItemClick} />
                    <Menu.Item
                        exact
                        name='transactions'
                        active={isActiveItem('transactions')}
                        onClick={this.handleItemClick}
                        as={NavLink}
                        to={LINKS.transactions}
                    />
                    <Menu.Item
                        exact
                        name='login'
                        active={isActiveItem('login')}
                        onClick={this.handleItemClick}
                        position='right'
                    />
                </Menu>
        )
    }
}