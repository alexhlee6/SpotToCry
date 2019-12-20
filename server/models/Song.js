const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artist = mongoose.model("artists");

const SongSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artists"
  },
  imageUrl: {
    type: String,
    required: true
  },
  songUrl: {
    type: String,
    required: true
  },
  playlists: [
    {
      type: Schema.Types.ObjectId,
      ref: "playlists"
    }
  ]
  // ,
  // album: {
  //   type: String,
  //   required: false
  // }
});

module.exports = mongoose.model('songs', SongSchema);