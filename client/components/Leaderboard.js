import React, {Component} from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'
export default class Leaderboard extends Component {
  constructor() {
    super()
    this.state = {
      players: [],
    }
  }
  async componentDidMount() {
    const players = await axios.get('/api/players')
    console.log(players)
    this.setState({players: players.data})
  }
  render() {
    return (
      <div style={{width: '50rem', display: 'flex', justifyContent: 'center'}}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map((player) => {
              return (
                <tr key={player.name}>
                  <td>{player.name}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}
