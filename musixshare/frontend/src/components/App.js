import { ReactDOM } from 'react';
import React, { Component } from 'react';
import {render} from 'react-dom';
import LandingPage from './LandingPage';
import HomePage from './HomePage';



export default class App extends Component {

    constructor(props) {
      super(props)
    
      
    }

  render() {
    return (
        <div className="center">
            <LandingPage />
        </div>
    )
  }
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);
