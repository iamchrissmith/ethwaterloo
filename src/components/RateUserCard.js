import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

export default class RateSlider extends Component {
  state = { rating: 0 }

  handleChange = e => this.setState({ rating: e.target.value })

  render() {
    const { rating } = this.state

    return (
      <div>
		<div>Name: { this.props.name }</div>
		<div>Address: { this.props.address.slice(0,8) }</div>
        <div>Rating: {rating}</div>
        <input type='range' min={0} max={10} value={rating} onChange={this.handleChange} />
        <br />
        <Rating rating={this.state.rating} maxRating={10} disabled={true} hidden={true} />
      </div>
    )
  }
}
