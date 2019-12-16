const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  artists: [{
    type: Schema.Types.ObjectId,
    ref: 'artists'
  }],
  imageUrl: {
    type: String,
    required: false
  }
});

// GenreSchema.statics.findSongs = (genreId) => {
//   const Genre = mongoose.model("genres");
//   return Genre.findById(genreId)
//     .populate('songs')
//     .then(genre => genre.songs);
// }

GenreSchema.statics.findArtists = (genreId) => {
  const Genre = mongoose.model("genres");
  return Genre.findById(genreId)
    .populate('artists')
    .then(genre => genre.artists);
}

module.exports = mongoose.model('genres', GenreSchema);