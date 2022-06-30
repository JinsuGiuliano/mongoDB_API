const authJwt = require("./authJwt");
const cleanCache = require("./cleanCache");
const { hasAuth } = require("./passportAut");
module.exports = {
  authJwt,
  cleanCache,
  hasAuth,
};
