import React, { Component } from 'react'
//import PropTypes from 'prop-types'
//import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

const LINKS = {
    dashboard: '/dashboard',
    transactions: '/transactions',
    login: '/login',
}

export default class MenuExampleInverted extends Component {
    state = { activeItem: 'dashboard' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state

        return (
            <Container fluid>
                <Menu fixed='top' inverted>
                    <Menu.Item header as='a' position='left'>Cryptofolio</Menu.Item>
                    <Menu.Item 
                        name='dashboard'
                        as={NavLink}
                        exact
                        to={LINKS.dashboard}
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick} />
                    <Menu.Item
                        name='transactions'
                        active={activeItem === 'Transactions'}
                        onClick={this.handleItemClick}
                        as={NavLink}
                        to={LINKS.transactions}
                    />
                    <Menu.Item
                        name='login'
                        active={activeItem === 'Login'}
                        onClick={this.handleItemClick}
                        position='right'
                    />
                </Menu>
            </Container>
        )
    }
}


//export default navBar