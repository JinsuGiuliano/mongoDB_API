const mongoose = require("mongoose");

// const list = [ 'development', 'education', 'enviroment', 'lifeStyle' ]

const CategorySchema = new mongoose.Schema({
    name: { type: String }
  },
);

const CategoryModel = mongoose.model("Categories", CategorySchema);

// list.forEach(e => {
//    CategoryModel.create({ name: e  },
//    function(err, small) {
//          if (err) return err;
//         // saved!
//     });
// })

module.exports = CategoryModel;