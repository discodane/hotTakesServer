const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://test:test@cluster0.sssef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function addSportsCaster(sportsCaster) {
  // create a new sports caster
  try {
    await client.connect();

    const collection = client.db("myFirstDatabase").collection("sportsCasters");
    collection.insertOne(sportsCaster);
  } catch (err) {
    console.log(error);
  } finally {
    await client.close();
  }
}

async function addTake(take, name) {
  // add to things like updating platform or adding a new take
  try {
    await client.connect();

    const collection = client.db("myFirstDatabase").collection("sportsCasters");
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

async function updateTake(takeId, fieldsToSet) {
  try {
    console.log("trying");
    await client.connect();

    const collection = client.db("myFirstDatabase").collection("sportsCasters");
    const query = { takeId: takeId };
    const update = {
      $set: { ...fieldsToSet },
    };
    console.log({ update });
    await collection.findOneAndUpdate(query, update);
  } catch (err) {
    console.log("error in update take", err);
  } finally {
    client.close();
  }
}

async function deleteSportsCaster() {
  // remove a sports caster all together
}

async function deleteTake() {
  // remove a sports caster all together
}

async function readDocument() {
  // get a sports caster
  try {
    await client.connect();

    const collection = client.db("myFirstDatabase").collection("sportsCasters");
    const query = {
      name: "Dan Patrick",
    };
    const sportsCaster = await collection.findOne(query);
    console.log(sportsCaster);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

module.exports = {
  readDocument,
  deleteSportsCaster,
  deleteTake,
  updateTake,
  addTake,
  addSportsCaster,
};
