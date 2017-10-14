import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

export default class RatingSubmitConfirm extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })
  handleConfirm = () => this.setState({ open: false })
  handleCancel = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Button color="green" onClick={this.show}>Submit That Bitch</Button>
        <Confirm
          open={this.state.open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
		  content="Are you sure you wanna do this?"
        />
      </div>
    )
  }
}
