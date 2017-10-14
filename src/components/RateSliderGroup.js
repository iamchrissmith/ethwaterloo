import React, { Component } from 'react'
import RateSlider from './RateSlider'
import { Button, Container } from 'semantic-ui-react'
import RatingSubmitConfirm from './RatingSubmitConfirm'

export default class RateSliderGroup extends Component {
	
  render() {

    return (
      <div>
		<Container text textAlign='center'>
		<RateSlider name="Max" address="0x0342342"/>
		<RateSlider name="Chris" address="0x499939" />
		<RateSlider name="Vitalk" address="0x736423"/>
		<RateSlider name="Noah" address="0x69696969"/>
		<Button color="green">Submit That Bitch</Button>
		</Container>
      </div>
    )
  }
}