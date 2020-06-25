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

    this.setState({players: players.data})
  }
  render() {
    console.log(this.state.players)
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
              <th>Postion</th>
            </tr>
          </thead>
          <tbody>
            {this.state.players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => {
                return (
                  <tr key={player.name}>
                    <td>{player.name}</td>
                    <td>{player.score}</td>
                    <td>{index + 1}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>
    )
  }
}
