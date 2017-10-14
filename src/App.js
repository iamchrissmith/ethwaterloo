import React, { Component } from 'react';
import { Rating } from 'semantic-ui-react';
//import Spheres from '../build/contracts/Spheres.json';
import getWeb3 from './utils/getWeb3';
import { Radar } from 'react-chartjs-2';
import RateSliderGroup from './components/RateSliderGroup';
import ResultsTable from './components/ResultsTable';
import { Container, Header } from 'semantic-ui-react';



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
    animation: {
		easing: 'easeInBack',
		duration: 3000
	},
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
      web3: null
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
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract');
    /* const spheres = contract(Spheres);
    spheres.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    let spheresInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      spheres.deployed().then((instance) => {
        spheresInstance = instance

        // Stores a given value, 5 by default.
        return spheresInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return spheresInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    }) */
  }

  render() {
    return (
      <div className="App">
		<Header size='huge' textAlign='center'>
	      Sphere Name
	    </Header>

		<Container textAlign='center' style={{ marginTop: '7em' }}>
			<div align="topleft">
				<Radar width={500} height={500} data={data} options={options} />
			</div>
			<RateSliderGroup />
		</Container>
		
		<ResultsTable />
	
		
      </div>
    );
  }
}

export default App
