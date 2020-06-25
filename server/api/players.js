const router = require('express').Router()
const Player = require('../db/models/player')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll()
    res.json(players)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPlayer = await Player.create(req.body)
    res.json(newPlayer)
  } catch (error) {
    next(error)
  }
})
