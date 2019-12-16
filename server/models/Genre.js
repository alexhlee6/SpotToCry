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
  artists: [{
    type: Schema.Types.ObjectId,
    ref: 'artists'
  }],
  imageUrl: {
    type: String,
    required: false
  }
});

GenreSchema.statics.findSongs = (genreId) => {
  return this.findById(genreId)
    .populate('songs')
    .then(genre => genre.songs);
}

GenreSchema.statics.findArtists = (genreId) => {
  return this.findById(genreId)
    .populate('artists')
    .then(genre => genre.artists);
}

module.exports = mongoose.model('genres', GenreSchema);