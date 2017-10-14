import React, { Component } from 'react';
import Sphere from '../build/contracts/Sphere.json';
import getWeb3 from './utils/getWeb3';
import { Radar } from 'react-chartjs-2';


const data = {
  labels: ['Max Nachamkin', 'Chris Smith', 'Noah', 'Vitalik'],
  datasets: [
    {
      label: 'October 2017 Ratings',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      lineTension: .5,
      data: [8, 6, 6, 9]
    }
  ]
};

var options = {
    responsive: false,
    maintainAspectRatio: true,
    scale: {
        ticks: {
            beginAtZero: true,
			reverse: true,
            max: 10
        }
    }
};


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      members: []
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.getMembers()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }


  async getMembers() {
    const contract = require('truffle-contract');
    const sphere = contract(Sphere);
    sphere.setProvider(this.state.web3.currentProvider);

    const instance = await sphere.deployed();
    const len = await instance.getMemberCount();

    let members = [];
    let l = len.toNumber();
    for (let i = 0; i < l; i += 1) {
        members.push(await instance.members.call(i))
    }
    console.log(members);
    return this.setState({ storageValue: l })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <Radar width={500} height={500} data={data} options={options} />

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
