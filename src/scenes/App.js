import React, { Component } from 'react';
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import { fetchPrices } from 'common/bitcoinPrices/bitcoinPricesActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.fetchPrices()
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <NavBar />
        <Main />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  fetchPrices: () => dispatch(fetchPrices())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
