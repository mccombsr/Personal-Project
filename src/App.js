import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Nav from './component/Nav/Nav';
import Header from './component/Header/Header';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav/>
        {routes}
      </div>
    );
  }
}

export default App;
