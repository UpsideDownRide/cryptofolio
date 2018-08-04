import React, { Component } from 'react';
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import { fetchPrices } from 'common/cryptoPrices/pricesActions'
import { fetchTicker } from 'common/cryptoPrices/tickersActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCurrencies } from 'common/selectors/TransactionsSelectors';

class App extends Component {
  state = { intervalId: null }

  componentDidMount() {
    this.props.fetchPrices('BTC')
    this.props.fetchTicker(this.props.currencies)
    clearInterval(this.state.intervalId)
    const newIntervalId = setInterval(() => this.props.fetchTicker(this.props.currencies), 15000)
    this.setState({ intervalId: newIntervalId })
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Main />
        <Footer />
      </React.Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
