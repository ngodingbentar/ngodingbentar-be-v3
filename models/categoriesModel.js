const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
  }
);
module.exports = mongoose.model('Categories', categoriesSchema);