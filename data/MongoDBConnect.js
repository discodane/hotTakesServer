const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uri =
  "mongodb+srv://test:test@cluster0.sssef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function getCollection() {
  return client.db("myFirstDatabase").collection("sportsCasters");
}

async function addSportsCaster(sportsCaster) {
  // create a new sports caster
  try {
    await client.connect();

    const collection = await getCollection();
    collection.insertOne(sportsCaster);
  } catch (err) {
    console.log(error);
  } finally {
    await client.close();
  }
}

// DONE
async function addTake(take, name) {
  // add to things like updating platform or adding a new take
  try {
    await client.connect();

    const collection = await getCollection();
    const query = { name: name };

    const updateDocument = {
      $push: { takes: take },
    };

    await collection.updateOne(query, updateDocument);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

// DONE
const createTakesUpdateObject = (fields) => {
  const returnable = {};
  for (let [key, value] of Object.entries(fields)) {
    returnable[`takes.$.${key}`] = value
  }
  return returnable
}

// DONE
async function updateTake(takeId, fieldsToSet) {
  try {
    await client.connect();
    const fieldsInSetFormat = createTakesUpdateObject(fieldsToSet);
    const collection = await getCollection()
    await collection.updateOne({"takes.takeId": takeId}, { $set: fieldsInSetFormat});
  } catch (err) {
    console.log("error in update take", err);
  } finally {
    client.close();
  }
}

async function deleteSportsCaster() {
  // remove a sports caster all together
}

async function deleteTake(sportsCasterName, takeId) {
  // remove a sports caster all together
  try {
    await client.connect();
    const collection = await getCollection();
    await collection.updateOne({name: sportsCasterName}, { $pull: { takes: {takeId: takeId } } } );
  } catch (err) {
    console.log('error in deleteTake', err);
  } finally {
    client.close()
  }
}

// DONE
async function readDocument(id) {
  // get a sports caster
  try {
    await client.connect();

    const collection = await getCollection();
    const query = {
      _id: ObjectId(id),
    };
    const sportsCaster = await collection.findOne(query);
    console.log(sportsCaster);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function getAll() {
  try {
    await client.connect();
    const collection = await getCollection();
    const casters = await collection.find().toArray();
    console.log(casters);
  } catch (err) {
    console.log('error in get all', err);
  } finally {
    await client.close();
  }
}

module.exports = {
  readDocument,
  deleteSportsCaster,
  deleteTake,
  getAll,
  updateTake,
  addTake,
  addSportsCaster,
};
