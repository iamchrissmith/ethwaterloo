import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';
import RateSliderGroup from './components/RateSliderGroup';
import ResultsTable from './components/ResultsTable';
import { Container, Header, Segment } from 'semantic-ui-react';
import Sphere from '../build/contracts/Sphere.json';
import { Radar } from 'react-chartjs-2';
import paillier from 'jspaillier';
import jsbn from 'jsbn';

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
    responsive: true,
    maintainAspectRatio: true,
    animation: {
		easing: 'easeInBack',
		duration: 3000
	},
    scale: {
        ticks: {
            beginAtZero: true,
			reverse: true,
            max: 10,
			display: false
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

    const keys = paillier.generateKeys(1024);
    this.state = {
      len: 0,
      publicKey: keys.pub,
      privateKey: keys.sec.lambda,
      web3: null,
      contract: {},
      names: ["Vitalk", "Noah", "Max", "Chris"],
      members: [],
      currentUser: ''
    }

    // console.log(keys.pub.encrypt(new jsbn.BigInteger('10')).toString());
    // console.log(keys.pub.encrypt(new jsbn.BigInteger('10')).toString());
    // console.log(keys.pub.encrypt(new jsbn.BigInteger('1')).toString());
    // console.log(keys.pub.encrypt(new jsbn.BigInteger('1')).toString());
    // console.log(keys.pub.n2.toString());

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

  async getRating(address) {
    if (address) {
      const contract = require('truffle-contract');
      console.log(address);
      const sphere = contract(Sphere);
      sphere.setProvider(this.state.web3.currentProvider);

      const instance = await sphere.deployed();
      const base = await instance.getMemberBase.call(address);
      const total = await instance.getMemberTotal.call(address);

      console.log(base);
      console.log(total);
      // return this.setState({ len: l, members })
      
    }
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

  submitRating = async (address, score) => {
    console.log(address, score)
    return this.state.contract.addRatingToMember(address,score, {from:this.state.currentUser, gas: 3000000 })
  }

  render() {
    console.log(this.getRating(this.state.members[0]));
    return (
      <div className="App">

		<Segment className="gradientHeader">
		<Container textAlign='center'>
	              <Header
	                as='h1'
	                content='Sphere Name'

	                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
	              />
	              <Header
	                as='h2'
	                content='Meritocratic Rating Application'
	                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
	              />

	            </Container>
	</Segment>


		<Container textAlign='center' style={{ marginTop: '7em' }}>
			<div>
				<Radar width={500} height={500} options={options} data={Object.assign(data, {labels: this.state.members.map(s => s.slice(0, 5) )})} />
			</div>
      <RateSliderGroup
        members={this.state.members}
        names={this.state.names}
        submitRating={this.submitRating}
      />
		</Container>

		<ResultsTable />

      </div>
    );
  }
}

export default App
