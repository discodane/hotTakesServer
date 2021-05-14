var express = require('express')
var router = express.Router()
const {
  deleteSportsCaster,
  getAll,
  getSportsCaster,
  updateSportsCaster,
  addSportsCaster,
} = require('../data/MongoDBConnect')

/* GET dummyCaster listing. */
router.post('/addSportsCaster', async function (req, res, next) {
  const body = req.body
  console.log({ body })
  await addSportsCaster(body)
  res.sendStatus(200)
})

router.put('/updateSportsCaster', async function (req, res, next) {
  const body = req.body
  console.log({ body })
  await updateSportsCaster(body.id, body.fields)
  res.sendStatus(200)
})

router.get('/getAllSportsCasters', async function (req, res, next) {
  const allCasters = await getAll()
  res.send(allCasters)
})

router.get('/getSportsCaster', async function (req, res, next) {
  const caster = await getSportsCaster(req.body)
  res.send(caster)
})

router.delete('/deleteSportsCaster', async function (req, res, next) {
  const body = req.body
  await deleteSportsCaster(body)
  res.sendStatus(200)
})

module.exports = router
