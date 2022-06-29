const db = require("../models");
const Following = db.following
const Followers = db.followers
const Notifications = db.notificattion 



const setupUser = async function (userId) { 

    await new Following({
        userId: userId, following: []
    }).save()

    await new Followers({
        userId: userId, followers: []
    }).save()
    
     await new Notifications({
         userId: userId, 
        messages: 0, alerts: 0, saved: 0
    }).save()

}


module.exports = setupUser;