import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Sidebar as SemanticSidebar, Menu } from 'semantic-ui-react'
import { NavLanding, NavItems } from 'components/NavMenuItems/NavMenuItems'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isUserLoggedIn } from 'common/user/userSelectors';
import { compose } from 'lodash/fp'

class Sidebar extends Component {
    state = { sidebarOpen: false }
    handleSidebarToggle = () => this.setState({ sidebarOpen: !this.state.sidebarOpen })
    handlePusherClick = () => this.state.sidebarOpen ? this.setState({ sidebarOpen: false }) : undefined

    // TODO: Consider - we are passing sidebarToggle to all children even though only one needs it. specifying the child would couple us to the component, is there an elegant solution to this? Maybe React context?
    render() {
        return (
            <SemanticSidebar.Pushable>
                <SemanticSidebar as={Menu} animation='overlay' width='thin' direction='right' inverted vertical visible={this.state.sidebarOpen}>
                    <NavLanding onClick={this.handleSidebarToggle} />
                    <NavItems isLoggedIn={this.props.isLoggedIn} onClick={this.handleSidebarToggle} />
                </SemanticSidebar>
                <SemanticSidebar.Pusher style={{ minHeight: "100vh" }} dimmed={this.state.sidebarOpen} onClick={this.handlePusherClick}>
                    {React.Children.map(this.props.children, child => React.cloneElement(child, { handleSidebarToggle: this.handleSidebarToggle }))}
                </SemanticSidebar.Pusher>
            </SemanticSidebar.Pushable>
        )
    }
}

Sidebar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    isLoggedIn: isUserLoggedIn(state)
})

export default compose(withRouter, connect(mapStateToProps))(Sidebar)
