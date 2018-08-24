import React from 'react'
import PropTypes from 'prop-types'
import style from './NavBar.module.css'
import { Menu, Segment, Icon, Responsive } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { NavLanding, NavItems } from 'components/NavMenuItems/NavMenuItems';

//TODO: Replace fixed width with dynamic width calculation and switch to hamburger when we surpass it
const WIDTH_BREAKPOINT = 400

const NavigationBar = ({ handleSidebarToggle }) => (
    <Segment inverted className={style.wrapper}>
        <Menu as='nav' className={style.navbar} fixed='top' inverted secondary pointing>
            <NavLanding position='left' />
            <Responsive minWidth={WIDTH_BREAKPOINT}>
                <div style={{ display: "flex" }}>
                    <NavItems />
                </div>
            </Responsive>
            <Responsive maxWidth={WIDTH_BREAKPOINT}>
                <Menu.Item onClick={handleSidebarToggle}><Icon name="sidebar" /></Menu.Item>
            </Responsive>
        </Menu>
    </Segment>
)

NavigationBar.propTypes = {
    handleSidebarToggle: PropTypes.func.isRequired
}

export default withRouter(NavigationBar)
