const { clearHash } = require('../services/cache')

// create a middleware that calls the clearHash() function;
module.exports = async function(req, res, next){
    // wait until Controller execution is done to clear hash on Redis
    // to prevent deleting redis data on a not completed Controller execution
    await next()
    clearHash(req.user.id)

}