const mongoose = require('mongoose');
mongoose.set("useCreateIndex", true);
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

PlaylistSchema.statics.addSong = (playlistId, songId) => {
  const Playlist = mongoose.model("playlists");
  const Song = mongoose.model("songs");

  return Playlist.findById(playlistId).then(playlist => {
    return Song.findById(songId).then(song => {
      playlist.songs.push(song);
      song.playlists.push(playlist);

      return Promise.all([playlist.save(), song.save()]).then(
        ([playlist, song]) => playlist
      );
    });
  });
};

PlaylistSchema.statics.removeSong = (playlistId, songId) => {
  const Playlist = mongoose.model("playlists");
  const Song = mongoose.model("songs");

  return Playlist.findById(playlistId).then(playlist => {
    return Song.findById(songId).then(song => {
      playlist.songs.pull(song);
      song.playlists.pull(playlist);

      return Promise.all([playlist.save(), song.save()]).then(
        ([playlist, song]) => playlist
      );
    });
  });
};

module.exports = mongoose.model('playlists', PlaylistSchema);