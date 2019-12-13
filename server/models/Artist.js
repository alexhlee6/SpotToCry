const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'songs'
  }],
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'genres'
  }],
  imageUrl: {
    type: String,
    required: false
  }
});

ArtistSchema.statics.findSongs = (songId) => {
  return this.findById(songId)
    .populate('songs')
    .then(artist => artist.songs);
}

ArtistSchema.statics.findGenres = (genreId) => {
  return this.findById(genreId)
    .populate('genres')
    .then(artist => artist.genres);
}

module.exports = mongoose.model('artists', ArtistSchema);