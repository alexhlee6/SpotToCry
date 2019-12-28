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
  ],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }]
});

SongSchema.statics.addLike = (songId, userId) => {
  const Song = mongoose.model("songs");
  const User = mongoose.model("users");
  return Promise.all([Song.findById(songId), User.findById(userId)])
    .then(([song, user]) => {
      song.likes.push(user);
      user.likedSongs.push(song);
      return Promise.all([song.save(), user.save()])
        .then(([song, user]) => song);
    })
}

SongSchema.statics.removeLike = (songId, userId) => {
  const Song = mongoose.model("songs");
  const User = mongoose.model("users");
  return Promise.all([Song.findById(songId), User.findById(userId)])
    .then(([song, user]) => {
      song.likes.pull(user);
      user.likedSongs.pull(song);
      return Promise.all([song.save(), user.save()])
        .then(([song, user]) => song);
    })
}

module.exports = mongoose.model('songs', SongSchema);