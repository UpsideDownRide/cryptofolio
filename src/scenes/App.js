import React, { Component } from 'react';
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import { fetchPrices } from 'common/cryptoPrices/pricesActions'
import { fetchTicker } from 'common/cryptoPrices/tickersActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCurrencies } from 'common/transactions/transactionsSelectors'
import { compose } from 'lodash/fp'
import { hot } from 'react-hot-loader'
import Sidebar from './Sidebar/Sidebar'

class App extends Component {
  state = { currencies: new Set() }
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

  render() {
    return (
      <Sidebar>
        <NavBar handleSidebarToggle={this.handleSidebarToggle} />
        <Main />
        <Footer />
      </Sidebar>
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
