import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import TitleBar from './components/TitleBar'
import InsertContainer from './components/InsertContainer'
import ReportContainer from './components/ReportContainer'
import './datetime.css';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <TitleBar/>
        <InsertContainer/>
        <ReportContainer/>
      </div>
    );
  }
}

export default App;
