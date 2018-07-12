import React, { Component } from 'react';
import style from './App.module.css';
import NavBar from './NavBar/NavBar'
import Dashboard from './Dashboard/Dashboard'

class App extends Component {
  render() {
    return (
      <div className={style.body}>
        <NavBar/>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
