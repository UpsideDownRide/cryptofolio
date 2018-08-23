import React, { Component } from 'react'
import { Sidebar as SemanticSidebar, Menu } from 'semantic-ui-react'
import { NavLanding, NavItems } from 'components/NavMenuItems/NavMenuItems'
import { withRouter } from 'react-router-dom'

class Sidebar extends Component {
    state = { sidebarOpen: false }
    handleSidebarToggle = () => this.setState({ sidebarOpen: !this.state.sidebarOpen })
    handlePusherClick = () => this.state.sidebarOpen ? this.setState({ sidebarOpen: false }) : undefined

    // TODO: Consider - we are passing sidebarToggle to all children even though only one needs it. specifying the child would couple us to the component, is there an elegant solution to this? Maybe React context?
    render() {
        return (
            <SemanticSidebar.Pushable>
                <SemanticSidebar as={Menu} direction='right' inverted vertical visible={this.state.sidebarOpen}>
                    <NavLanding onClick={this.handleSidebarToggle} />
                    <NavItems onClick={this.handleSidebarToggle} />
                </SemanticSidebar>
                <SemanticSidebar.Pusher style={{ minHeight: "100vh" }} inverted dimmed={this.state.sidebarOpen} onClick={this.handlePusherClick}>
                    {React.Children.map(this.props.children, child => React.cloneElement(child, { handleSidebarToggle: this.handleSidebarToggle }))}
                </SemanticSidebar.Pusher>
            </SemanticSidebar.Pushable>
        )
    }
}

export default withRouter(Sidebar)
