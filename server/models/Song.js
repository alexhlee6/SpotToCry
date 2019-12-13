const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'artists'
  }
  // ,
  // album: {
  //   type: String,
  //   required: false
  // }
});

module.exports = mongoose.model('songs', SongSchema);