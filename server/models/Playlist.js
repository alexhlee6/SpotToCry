const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'songs'
  }]
});

PlaylistSchema.statics.findSongs = (songId) => {
  return this.findById(songId)
    .populate('songs')
    .then(playList => playList.songs);
}

module.exports = mongoose.model('playlists', PlaylistSchema);