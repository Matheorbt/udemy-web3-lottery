import logo from "./logo.svg";
import "./App.css";
import React from "react";
import lottery from "./lottery"

import web3 from "./web3"
 
class App extends React.Component {
    componentDidMount() {

    }
  render() {
    // Get MetaMask accounts list
    // web3.eth.getAccounts().then(console.log);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
export default App;