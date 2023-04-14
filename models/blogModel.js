const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    banner: { type: String, required: false },
    body: { type: String, required: false },
    category: { type: String, required: false },
    view: { type: Number, required: false },
    date: {type: String, default: Date.now}
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Blog', blogSchema);