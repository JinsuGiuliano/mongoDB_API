const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
// change behavior to allow Promise return on call. This enables to use 'Async/Await'
client.hGet = util.promisify(client.get);

// create an Query exec instance funciton where we can apply changes to it later on
const exec = mongoose.Query.prototype.exec;

// add cache function attribute to Query Mongoose function
mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");

  return this;
};
// change behavior on Mongoose Query function
mongoose.Query.prototype.exec = async function () {
  // check if .cache() function has been called
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  // If yes, cache Query on redis server
  // key would be the identifier of the current Query on Redis DB
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cacheValue = await client.hGet(this.hashKey, key);
  // Check if the Query exist redis
  if (cacheValue) {
    // if yes, check if is Array
    const doc = JSON.parse(cacheValue);
    Array.isArray(doc)
      ? // if yes, create an array with new mongoose instanse with corresponding attributes
        doc.map((d) => new this.model(d))
      : // just new mongoose instanse with corresponding attributes
        new this.model(doc);
  }

  //apply all changes to Query's exec function
  const result = await exec.apply(this, arguments);
  // register Query and Data on Redis
  client.hSet(this.hashKey, key, JSON.stringify(result), "EX", 10);
  //return Query execution to performe original and added functionalities
  return result;
};

// create a function that clean a user's cache based on hashKey (req.user.id)
module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
