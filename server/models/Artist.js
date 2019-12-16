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
  return mongoose.model("artists").findById(artistId)
    .populate('songs')
    .then(artist => artist.songs);
}

ArtistSchema.statics.findGenres = (artistId) => {
  return mongoose.model("artists").findById(artistId)
    .populate('genres')
    .then(artist => artist.genres);
}

ArtistSchema.statics.addSong = (artistId, songId) => {
  const Artist = mongoose.model("artists");
  const Song = mongoose.model("songs");
  return Artist.findById(artistId).then(artist => {
    return Song.findById(songId).then(song => {
      artist.songs.push(song); // are these push ?
      return Promise.all([artist.save(), song.save()]).then(
        ([artist, song]) => artist
      )
    })
  })
}

ArtistSchema.statics.addGenre = (artistId, genreId) => {
  const Artist = mongoose.model("artists");
  const Genre = mongoose.model("genres");
  return Artist.findById(artistId).then(artist => {
    return Genre.findById(genreId).then(genre => {
      artist.genres.push(genre);
      genre.artists.push(artist);
      return Promise.all([artist.save(), genre.save()]).then(
        ([artist, genre]) => artist
      )
    })
  })
}

module.exports = mongoose.model('artists', ArtistSchema);