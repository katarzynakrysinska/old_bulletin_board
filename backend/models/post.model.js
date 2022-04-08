const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  created: { type: Date, required: true },
  updated: { type: Date,},
  status: { type: String, required: true },
  title: { type: String, required: true, minlength: 10, maxlength: 30},
  text: { type: String, required: true, minlength: 20, maxlength: 80},
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
