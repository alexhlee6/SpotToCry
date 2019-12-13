const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  artist: {
    type: String,
    required: true
  }
})