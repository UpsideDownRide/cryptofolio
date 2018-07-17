import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import style from './NavBar.module.css'
import { Link } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

// const navBar = () => (
//     <header>
//         <div className={style.siteName}>Cryptofolio</div>
//         <nav>
//             <ul className={style.ul}>
//                 <li><Link to='/' className={style.link}>Dashboard</Link></li>
//                 <li><Link to='/portfolio' className={style.link}>Portfolio</Link></li>
//                 <li><Link to='/login' className={style.link}>Login</Link></li>
//             </ul>
//         </nav>
//     </header>
// )
const LINKS = {
    dashboard: '/',
    portfolio: '/portfolio',
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
                    <Menu.Item name='dashboard' as={Link} to={LINKS.dashboard} active={activeItem === 'home'} onClick={this.handleItemClick} />
                    <Menu.Item
                        name='portfolio'
                        active={activeItem === 'Portfolio'}
                        onClick={this.handleItemClick}
                        as={Link}
                        to={LINKS.portfolio}
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