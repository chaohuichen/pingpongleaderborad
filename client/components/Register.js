import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import GameScoreboard from './gameScoreboard'
import axios from 'axios'
import {Button} from 'react-bootstrap'
export default class Register extends Component {
  constructor() {
    super()
    this.state = {
      player1Name: '',
      player2Name: '',
      playersname: [],
      start: false,
      error: '',
    }
    this.handleOnchange = this.handleOnchange.bind(this)
    this.handOnSubmit = this.handOnSubmit.bind(this)
    this.handOnSubmit2 = this.handOnSubmit2.bind(this)
    this.select = this.select.bind(this)
    this.check = this.check.bind(this)
    this._renderFrom = this._renderFrom.bind(this)
  }
  async componentDidMount() {
    const players = await axios.get('/api/players')
    console.log(players)
    this.setState({playersname: players.data})
  }

  handleOnchange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  async handOnSubmit(event) {
    event.preventDefault()
    try {
      let name = this.state.player1Name.split(' ').join()
      let player = {name: name}
      await axios.post('/api/players', player)
    } catch (error) {
      console.error(Error)
    }
  }

  async handOnSubmit2(event) {
    try {
      event.preventDefault()
      let name = this.state.player2Name.split(' ').join()
      let player = {name: name}
      await axios.post('/api/players', player)
    } catch (error) {
      console.error(error)
    }
  }
  select(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  check() {
    if (
      this.state.player1Name === this.state.player2Name ||
      this.state.player2Name === '' ||
      this.state.player1Name === ''
    ) {
      this.setState({start: false})
      this.setState({error: 'there is an error on the input'})
    } else {
      this.setState({start: true})
    }
    this.error = setInterval(() => {
      this.setState({error: ''})
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.error)
  }
  _renderFrom() {
    return (
      <>
        <form
          style={{
            marginBottom: '20px',
          }}
        >
          <div className="form-group">
            <label style={{fontSize: '20px'}}>Player One Name: </label>
            <input
              className="form-control"
              type=""
              name="player1Name"
              value={this.state.player1Name}
              onChange={this.handleOnchange}
            />
          </div>

          <div className="form-group">
            <label className="exampleFormControlSelect2">
              Select Previous Name
            </label>
            <select
              name="player1Name"
              style={{width: '100px'}}
              onClick={this.select}
              className="form-control"
            >
              {this.state.playersname.length > 0 &&
                this.state.playersname.map((player) => {
                  return (
                    <option key={player.name} value={player.name}>
                      {player.name}
                    </option>
                  )
                })}
            </select>
          </div>
          <Button type="submit" onClick={this.handOnSubmit}>
            Submit for playe1
          </Button>
        </form>
        {/* {player 2 form } */}
        <form onSubmit={this.handOnSubmit}>
          <div className="form-group">
            <label style={{fontSize: '20px'}}>Player Two Name:</label>
            <input
              type=""
              name="player2Name"
              className="form-control"
              value={this.state.player2Name}
              onChange={this.handleOnchange}
            />
          </div>

          <div className="form-group">
            <label className="exampleFormControlSelect2">
              Select Previous Name
            </label>
            <select
              name="player2Name"
              className="form-control"
              onClick={this.select}
              style={{width: '100px'}}
            >
              {this.state.playersname.length > 0 &&
                this.state.playersname.map((player) => {
                  return (
                    <option key={player.name} value={player.name}>
                      {player.name}
                    </option>
                  )
                })}
            </select>
          </div>
          <Button type="submit" onClick={this.handOnSubmit2}>
            Submit for playe2
          </Button>
        </form>
      </>
    )
  }
  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this._renderFrom()}
          {/* {for error} */}
          {this.state.error !== '' && (
            <p style={{color: 'red'}}>{this.state.error}</p>
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button
              style={{
                marginTop: '20px',
                width: '200px',
                height: '50px',
                marginRight: '20px',
              }}
              type="button"
              disabled={
                this.state.player2Name === '' && this.state.player2Name === ''
              }
              variant="success"
              onClick={this.check}
            >
              Start Game
            </Button>
            <Button
              style={{
                marginTop: '20px',
                width: '200px',
                height: '50px',
                marginLeft: '20px',
              }}
              variant="danger"
              type="button"
            >
              Terminate Game
            </Button>
          </div>
        </div>
        <hr />_
        <GameScoreboard
            player1={this.state.player1Name}
            player2={this.state.player2Name}
            start={this.state.start}
          />
      </div>
    )
  }
}
