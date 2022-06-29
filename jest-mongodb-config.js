
module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'Giuliano_db'
    },
    binary: {
      version: '5.0.5', // Version of MongoDB
      skipMD5: true
    },
    autoStart: false
  }
};