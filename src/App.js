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

    // this.setCurrentUser = this.setCurrentUser.bind(this)

    const keys = paillier.generateKeys(1024);
    this.state = {
      len: 0,
      publicKey: keys.pub,
      privateKey: keys.sec.lambda,
      web3: null,
      contract: {},
      names: ["Vitalk", "Noah", "Max", "Chris"],
      members: [],
      ratings: [0, 0, 0, 0],
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
    .then(async results => {
      this.setState({
        web3: results.web3
      })

      const contract = require('truffle-contract');

      const sphere = contract(Sphere);
      sphere.setProvider(this.state.web3.currentProvider);

      const instance = await sphere.deployed();
      this.setState({contract: instance})

      // Instantiate contract once web3 provided.
      const currentUser = await this.state.web3.eth.getAccounts(this.setCurrentUser)
      const members = await this.getMembers()
      console.log(this.getRating(this.state.members[0]));

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  componentDidMount() {
  }

  setCurrentUser = (err, accounts) => {
    return this.setState({currentUser: accounts[0]});
  }

  async getRating(address) {
    if(address){
      console.log(address);
      const base = await this.state.contract.getMemberBase.call(address);
      const total = await this.state.contract.getMemberTotal.call(address);

      return [base, total];
    }
  }

  async getMembers() {
    const len = await this.state.contract.getMemberCount();

    let members = [];
    let l = len.toNumber();
    for (let i = 0; i < l; i += 1) {
      members.push(await this.state.contract.members.call(i))
    }
    return this.setState({ len: l, members })
  }

  submitRating = async (address, score) => {
    const [base, total] = await this.getRating(address);
    let res;
    if (base.toString() === "0") {
      res = this.state.contract.addRatingToMember(address, score, {from:this.state.currentUser, gas: 300000 })
    } else {
      
    }
     console.log(address, score, base, total);
    return res;
  }

  render() {
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
				<Radar width={500} height={500} options={options} data={
          Object.assign(data, { data: this.state.ratings, labels: this.state.members.map(s => s.slice(0, 5) ) })
        } />
			</div>
      <RateSliderGroup
        members={this.state.members}
        names={this.state.names}
        currentUser={this.state.currentUser}
        submitRating={this.submitRating}
      />
		</Container>

		<ResultsTable />

      </div>
    );
  }
}

export default App
