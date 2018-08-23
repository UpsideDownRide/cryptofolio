import React, { Component } from 'react';
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import { Sidebar, Menu } from 'semantic-ui-react'
import { fetchPrices } from 'common/cryptoPrices/pricesActions'
import { fetchTicker } from 'common/cryptoPrices/tickersActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCurrencies } from 'common/transactions/transactionsSelectors'
import { compose } from 'lodash/fp'
import { hot } from 'react-hot-loader'

class App extends Component {
  state = { currencies: new Set(), sidebarOpen: false }
  tickerInterval = undefined

  static getDerivedStateFromProps(props, state) {
    const union = new Set([...props.currencies, ...state.currencies])
    const differenceArray = [...props.currencies].filter(el => !state.currencies.has(el))
    if (union.size !== state.currencies.size) {
      props.fetchPrices(differenceArray)
      return {
        currencies: union
      }
    }
    return null
  }

  componentDidMount() {
    this.props.fetchTicker(this.props.currencies)
    this.tickerInterval = setInterval(() => this.props.fetchTicker(this.props.currencies), 10000)
  }

  componentWillUnmount() {
    clearInterval(this.tickerInterval)
  }

  handleSidebarToggle = () => this.setState({ sidebarOpen: !this.state.sidebarOpen })
  handlePusherClick = () => this.state.sidebarOpen ? this.setState({ sidebarOpen: false }) : undefined

  render() {
    return (
      <Sidebar.Pushable>
        <Sidebar as={Menu} direction='right' inverted vertical visible={this.state.sidebarOpen}>
          <Menu.Item active>Test</Menu.Item>
        </Sidebar>
        <Sidebar.Pusher style={{ minHeight: "100vh" }} inverted dimmed={this.state.sidebarOpen} onClick={this.handlePusherClick}>
          <NavBar handleSidebarToggle={this.handleSidebarToggle} />
          <Main />
          <Footer />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = (state) => ({
  currencies: getCurrencies(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPrices: (currencies) => dispatch(fetchPrices(currencies)),
  fetchTicker: (currencies) => dispatch(fetchTicker(currencies))
})

const composedWrappers = compose(
  withRouter,
  hot(module),
  connect(mapStateToProps, mapDispatchToProps)
)

export default composedWrappers(App)
