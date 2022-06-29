const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');

const dbConfig = require("./app/config/db.config");
mongoose.Promise = global.Promise;
let mongo = undefined;

const dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

const connect = async () => {

 mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
 
 const db =  mongoose.connection;
 
    db.on("error", () => {
        console.log("could not connect");
    });

    db.once("open", () => {
        console.log("> Successfully connected to database");
    });
 mongoose.Promise = global.Promise;
}; 


const setUpTest = async () => {
    mongo = await MongoMemoryServer.create();
    const url = mongo.getUri();

    await mongoose.connect(url, {
      useNewUrlParser: true,
  });
};

const dropDatabaseTest = async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
    }
};

const dropCollectionsTest = async () => {
    if (mongo) {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};

module.exports = { connect, dbUrl, setUpTest, dropDatabaseTest, dropCollectionsTest};