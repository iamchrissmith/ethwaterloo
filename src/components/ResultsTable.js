import React, { Component } from 'react'
import { Table, Header, Container } from 'semantic-ui-react'

export default class ResultsTable extends Component {

  render() {

    return (
		<div>
			<Header
		      as='h3'
		      content='Meritocratic Ratings for October 2017'
		      textAlign='center'
		    />
		    <Container>
		      <Table celled>
		        <Table.Header>
		          <Table.Row>
		            <Table.HeaderCell>Participant</Table.HeaderCell>
		            <Table.HeaderCell>Average Rating</Table.HeaderCell>
		          </Table.Row>
		        </Table.Header>

		        <Table.Body>
		          <Table.Row>
		            <Table.Cell>
		              <Header as='h4' image>
		                <Header.Content>
		                  Max Nachamkin
		                  <Header.Subheader>0x3423423</Header.Subheader>
		                </Header.Content>
		              </Header>
		            </Table.Cell>
		            <Table.Cell>
		              8
		            </Table.Cell>
		          </Table.Row>

		        </Table.Body>
		      </Table>
		    </Container>
		</div>
    )
  }
}
