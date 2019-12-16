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
  },
  description: {
    type: String,
    required: false
  }
});

ArtistSchema.statics.findSongs = (artistId) => {
  return this.findById(artistId)
    .populate('songs')
    .then(artist => artist.songs);
}

ArtistSchema.statics.findGenres = (artistId) => {
  return this.findById(artistId)
    .populate('genres')
    .then(artist => artist.genres);
}

module.exports = mongoose.model('artists', ArtistSchema);