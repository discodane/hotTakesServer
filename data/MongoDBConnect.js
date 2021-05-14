const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const uri =
  'mongodb+srv://test:test@cluster0.sssef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function getCollection() {
  await client.connect()
  return client.db('myFirstDatabase').collection('sportsCasters')
}

async function addSportsCaster(sportsCaster) {
  // create a new sports caster
  try {
    const collection = await getCollection()
    await collection.insertOne(sportsCaster)
  } catch (err) {
    console.log(error)
  } finally {
    await client.close()
  }
}

// DONE
async function addTake(id, take) {
  // add to things like updating platform or adding a new take
  try {
    const collection = await getCollection()
    const query = { _id: ObjectId(id) }

    const updateDocument = {
      $push: { takes: take },
    }

    await collection.updateOne(query, updateDocument)
  } catch (err) {
    console.log(err)
  } finally {
    client.close()
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
  try {
    const fieldsInSetFormat = createTakesUpdateObject(fieldsToSet)
    const collection = await getCollection()
    await collection.updateOne(
      { 'takes.takeId': takeId },
      { $set: fieldsInSetFormat }
    )
  } catch (err) {
    console.log('error in update take', err)
  } finally {
    client.close()
  }
}

async function deleteTake(id, takeId) {
  // remove a sports caster all together
  try {
    const collection = await getCollection()
    await collection.updateOne(
      { _id: ObjectId(id) },
      { $pull: { takes: { takeId: takeId } } }
    )
  } catch (err) {
    console.log('error in deleteTake', err)
  } finally {
    client.close()
  }
}

async function deleteSportsCaster(id) {
  // remove a sports caster all together
  try {
    const collection = await getCollection()
    await collection.deleteOne({ _id: ObjectId(id) })
  } catch (err) {
    console.log('error in delete caster', err)
  } finally {
    client.close()
  }
}

async function updateSportsCaster(id, fieldsToSet) {
  try {
    const collection = await getCollection()
    await collection.updateOne(
      {
        _id: ObjectId(id),
      },
      { $set: fieldsToSet }
    )
  } catch (err) {
    console.log('update caster', err)
  } finally {
    client.close()
  }
}

// DONE
async function getSportsCaster(id) {
  // get a sports caster
  try {
    const collection = await getCollection()
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
  try {
    const collection = await getCollection()
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
