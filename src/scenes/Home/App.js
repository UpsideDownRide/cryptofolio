import React, { Component } from 'react';
import style from './App.module.css';
import '../../../node_modules/react-vis/dist/style.css';
import NavBar from './NavBar/NavBar'
//import Dashboard from './Dashboard/Dashboard'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import { Container } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Container fluid>
        <NavBar/>
        <Main/>
        <Footer/>
      </Container>
    );
  }
}

export default App;
