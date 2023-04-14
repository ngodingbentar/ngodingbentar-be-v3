const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    urlCode: { type: String, required: false },
    longUrl: { type: String, required: false },
    shortUrl: { type: String, required: false },
    date: {type: String, default: Date.now}
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Url', urlSchema);