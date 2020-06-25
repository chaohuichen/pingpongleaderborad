import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import Leaderboard from './Leaderboard'
export default class GameScoreboard extends Component {
  constructor(prop) {
    super()
    this.state = {
      player1Score: 0,
      player2Score: 0,
      serve: '',
      winner: '',
      switch: 1,
    }
    this.getPoints = this.getPoints.bind(this)
    this.showWinner = this.showWinner.bind(this)
  }
  getPoints(event, player) {
    if (player === 1) {
      let prevPoint = this.state.player1Score
      let prevSwitch = this.state.switch
      this.setState({
        player1Score: prevPoint + 1,
        switch: this.state.switch - 1,
      })
      if (this.state.switch === 0) {
        this.setState({
          serve: this.props.player2,
          switch: 1,
        })
      }
      console.log(this.state.switch, this.state.serve)
    } else if (player === 2) {
      let prevPoint = this.state.player2Score
      this.setState({
        player2Score: prevPoint + 1,
        switch: this.state.switch - 1,
      })
      if (this.state.switch === 0) {
        this.setState({
          serve: this.props.player1,
          switch: 1,
        })
      }
    }
    this.showWinner()
  }

  showWinner() {
    if (
      Number(this.state.player1Score) >= 10 &&
      this.state.player1Score - this.state.player2Score >= 2
    ) {
      this.setState({winner: this.props.player1})
    } else if (
      this.state.player2Score >= 10 &&
      this.state.player2Score - this.state.player1Score >= 2
    ) {
      this.setState({winner: this.props.player2})
    }
  }
  render() {
    const {player1, player2, start} = this.props
    console.log(player1, player2, start)
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {/* {player one } */}
          <div style={{marginRight: '20px'}}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor:
                  this.state.serve === `${player1}` ? 'green' : 'blue',
                borderRadius: '15px',
                width: '15rem',
              }}
            >
              <h2 style={{color: 'white'}}>Name:</h2>
              <h2 style={{color: 'white'}}>{player1}</h2>
            </div>
            <h4 style={{marginLeft: '40px'}}>
              score:{'       ' + this.state.player1Score}
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                disabled={this.state.serve !== this.props.player1 && start}
                type="button"
                onClick={(event) => this.getPoints(event, 1)}
              >
                GetPoints
              </Button>
              <Button
                type="button"
                disabled={this.serve === '' && start}
                onClick={() => this.setState({serve: player1})}
              >
                Serve
              </Button>
            </div>
          </div>

          {/* {player 2} */}
          <div style={{marginLeft: '20px'}}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor:
                  this.state.serve === `${player2}` ? 'green' : 'blue',
                borderRadius: '15px',
                width: '15rem',
              }}
            >
              <h2 style={{color: 'white'}}>Name:</h2>
              <h2 style={{color: 'white'}}> {player2}</h2>
            </div>
            <h4 style={{marginLeft: '40px'}}>
              score:{'       ' + this.state.player2Score}
            </h4>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                disabled={this.state.serve !== this.props.player2 && start}
                type="button"
                onClick={(event) => this.getPoints(event, 2)}
              >
                GetPoints
              </Button>
              <Button
                type="button"
                disabled={this.serve === ''}
                onClick={() => this.setState({serve: player2})}
              >
                Serve
              </Button>
            </div>
          </div>
        </div>
        {this.state.winner !== '' && <h1>winner: {this.state.winner}</h1>}
        <Leaderboard />
      </div>
    )
  }
}
