const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'songs'
  }],
  imageUrl: {
    type: String,
    required: false
  }
});

GenreSchema.statics.findSongs = (songId) => {
  return this.findById(songId)
    .populate('songs')
    .then(genre => genre.songs);
}

module.exports = mongoose.model('genres', GenreSchema);