import React, { Component } from 'react';
import style from './App.module.css';
import NavBar from './NavBar/NavBar'
import Dashboard from './Dashboard/Dashboard'
import Footer from './Footer/Footer'

class App extends Component {
  render() {
    return (
      <div className={style.body}>
        <NavBar/>
        <Dashboard/>
        <Footer/>
      </div>
    );
  }
}

export default App;
