const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Player = db.define('player', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})

module.exports = Player
