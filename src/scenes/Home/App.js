import React, { Component } from 'react';
import style from './App.module.css';
import '../../../node_modules/react-vis/dist/style.css';
import NavBar from './NavBar/NavBar'
//import Dashboard from './Dashboard/Dashboard'
import Footer from './Footer/Footer'
import Main from './Main/Main'

class App extends Component {
  render() {
    return (
      <div className={style.body}>
        <NavBar/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
