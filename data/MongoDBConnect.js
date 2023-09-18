const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const casterHelpers = require('../utilities/casterHelpers')
const uri =
  'mongodb+srv://test:test@cluster0.xbdwkpo.mongodb.net/?retryWrites=true&w=majority'

getClient = () => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 30000,
    keepAlive: 1,
  })
  return client
}

async function getCollection(client) {
  await client.connect()
  return client.db('myFirstDatabase').collection('sportsCasters')
}

async function addSportsCaster(sportsCaster) {
  // create a new sports caster
  const client = await getClient()
  try {
    const collection = await getCollection(client)
    await collection.insertOne({
      ...sportsCaster,
      takes: [],
    })
  } catch (err) {
    console.log(error)
  } finally {
    await client.close()
  }
}

async function calculateNewScore(id, result) {
  const caster = await getSportsCaster(id)
  if (caster.score) {
    const newScore = casterHelpers.addTakeToAverage(caster.score, result)
  }
}

// DONE
async function addTake(id, take) {
  // add to things like updating platform or adding a new take
  const client = await getClient()
  try {
    const collection = await getCollection(client)
    const query = { _id: ObjectId(id) }
    take._id = ObjectId().toString()
    const updateDocument = {
      $push: { takes: take },
    }

    await collection.updateOne(query, updateDocument)
    await calculateNewScore(id, take.result)
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}
// DONE

const createTakesUpdateObject = (fields) => {
  const returnable = {}
  for (let [key, value] of Object.entries(fields)) {
    returnable[`takes.$.${key}`] = value
  }
  return returnable
}

// DONE
async function updateTake(takeId, fieldsToSet) {
  const client = await getClient()
  try {
    const fieldsInSetFormat = createTakesUpdateObject(fieldsToSet)
    const collection = await getCollection(client)
    await collection.updateOne(
      { 'takes.takeId': takeId },
      { $set: fieldsInSetFormat }
    )
  } catch (err) {
    console.log('error in update take', err)
  } finally {
    await client.close()
  }
}

async function deleteTake(id, takeId) {

  const client = await getClient()
  try {
    const collection = await getCollection(client)
    await collection.updateOne(
      { _id: ObjectId(id) },
      { $pull: { takes: { takeId: takeId } } }
    )
  } catch (err) {
    console.log('error in deleteTake', err)
  } finally {
    await client.close()
  }
}

async function deleteSportsCaster(id) {
  // remove a sports caster all together
  const client = await getClient()
  try {
    const collection = await getCollection(client)
    await collection.deleteOne({ _id: ObjectId(id) })
  } catch (err) {
    console.log('error in delete caster', err)
  } finally {
    await client.close()
  }
}

async function updateSportsCaster(id, fieldsToSet) {
  const client = await getClient()
  try {
    const collection = await getCollection(client)
    await collection.updateOne(
      {
        _id: ObjectId(id),
      },
      { $set: fieldsToSet }
    )
  } catch (err) {
    console.log('update caster', err)
  } finally {
    await client.close()
  }
}

// DONE
async function getSportsCaster(id) {
  // get a sports caster
  const client = await getClient()
  try {
    const collection = await getCollection(client)
    const query = {
      _id: ObjectId(id),
    }
    const sportsCaster = await collection.findOne(query)
    return sportsCaster
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}

async function getAll() {
  const client = await getClient()
  try {
    const collection = await getCollection(client)
    const casters = await collection.find().toArray()
    return casters
  } catch (err) {
    console.log('error in get all', err)
  } finally {
    await client.close()
  }
}

module.exports = {
  getSportsCaster,
  deleteSportsCaster,
  deleteTake,
  getAll,
  updateTake,
  updateSportsCaster,
  addTake,
  addSportsCaster,
}
