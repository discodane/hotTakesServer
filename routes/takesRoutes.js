var express = require('express')
var router = express.Router()
const { deleteTake, addTake, updateTake } = require('../data/MongoDBConnect')

/* GET dummyCaster listing. */
router.post('/addTake', async function (req, res, next) {
  const { id, take } = req.body
  await addTake(id, take)
  res.sendStatus(200)
})

router.delete('/deleteTake', async function (req, res, next) {
  const { id, takeId } = req.body
  await deleteTake(id, takeId)
  res.send(200)
})

router.put('/updateTake', async function (req, res, next) {
  const { id, fields } = req.body
  await updateTake(id, fields)
  res.send(200)
})

module.exports = router
