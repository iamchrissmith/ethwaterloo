import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';
import RateSliderGroup from './components/RateSliderGroup';
import ResultsTable from './components/ResultsTable';
import { Container, Header, Rating } from 'semantic-ui-react';
import Sphere from '../build/contracts/Sphere.json';
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

    this.setCurrentUser = this.setCurrentUser.bind(this)

    this.state = {
      len: 0,
      web3: null,
      contract: {},
      names: ["Vitalk", "Noah", "Max", "Chris"],
      members: [],
      currentUser: ''
    }
  }

  // get ratings for each member
  // submitRating async function

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

  setCurrentUser(err, accounts) {
    return this.setState({currentUser: accounts[0]});
  }

  async getMembers() {
    const contract = require('truffle-contract');

    const sphere = contract(Sphere);
    sphere.setProvider(this.state.web3.currentProvider);

    this.state.web3.eth.getAccounts(this.setCurrentUser)

    const instance = await sphere.deployed();
    this.setState({contract: instance})
    const len = await instance.getMemberCount();

    let members = [];
    let l = len.toNumber();
    for (let i = 0; i < l; i += 1) {
      members.push(await instance.members.call(i))
    }

    return this.setState({ len: l, members })
  }

  async submitRatings(e) {
    e.preventDefault()
    console.log(e)

  }

  render() {

    return (
      <div className="App">
        <Header size='huge' textAlign='center'>
            Sphere Name
          </Header>

        <Container textAlign='center' style={{ marginTop: '7em' }}>
          <div align="topleft">
            <Radar width={500} height={500} options={options} data={Object.assign(data, {labels: this.state.members.map(s => s.slice(0, 5) )})} />
          </div>
          <RateSliderGroup 
            members={this.state.members} 
            names={this.state.names}
            submitRatings={this.submitRatings}
          />
        </Container>

        <ResultsTable />

      </div>
    );
  }
}

export default App
