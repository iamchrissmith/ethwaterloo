import React, { Component } from 'react'
import { Button, Rating, Card } from 'semantic-ui-react'

export default class RateSlider extends Component {
  state = { rating: 0, submitted: 0 }

	handleChange = e => this.setState({ rating: e.target.value })
	handleSubmit = async e => {
		await this.props.submitRating(this.props.address, this.state.rating)
		this.setState({submitted: this.state.submitted + 1})
	}

	isDisabled = () => {
		return this.props.address === this.props.currentUser || this.state.submitted >= 2
	}

	hideCard = () => {
		return this.props.address === this.props.currentUser ? 'hideCard' : '';
	}

  render() {
    const { rating } = this.state

    return (
		<Card centered={true}>
		    <Card.Content>
		      <Card.Header>
		        { this.props.name }
		      </Card.Header>
		      <Card.Meta>
		        { this.props.address.slice(0,10) }
		      </Card.Meta>
					<Card.Description className={this.hideCard()}>
						<input type='range' min={0} max={10} value={rating} onChange={this.handleChange} disabled={this.isDisabled()}/>
						<br />
						Rating: {rating}
						<Rating rating={this.state.rating} maxRating={10} disabled={true} hidden={true}/>
						<br/>
						<Button primary onClick={this.handleSubmit} disabled={this.isDisabled()}>Submit Rating</Button>
					</Card.Description>
					<Card.Description className="altCard">
						<p><em>This is you</em></p>
					</Card.Description>
		    </Card.Content>
		  </Card>
    )
  }
}
