import React, { Component } from 'react'
import RateSlider from './RateSlider'
import { Card, Container } from 'semantic-ui-react'

export default class RateSliderGroup extends Component {

  render() {
    return (
      <div>
				<Container text textAlign='center'>
					<Card.Group>
						{this.props.members.map(
							(member, i) =>
								<RateSlider
									key={i}
									name={this.props.names[i]} address={member} 
									submitRating={this.props.submitRating}
									currentUser={this.props.currentUser}
								/>
						)}
					</Card.Group>
				</Container>
			</div>
		)
	}
}