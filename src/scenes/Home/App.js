import React, { Component } from 'react';
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import Main from './Main/Main'

class App extends Component {
  render() {
    return (
      <div style={{display: "flex", flexDirection: "column", height:"100%"}}>
        <NavBar/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
