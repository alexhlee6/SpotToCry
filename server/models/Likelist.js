const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model("users");

const LikelistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  artists: [{
    type: Schema.Types.ObjectId,
    ref: 'artists'
  }],
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'songs'
  }]
});

LikelistSchema.statics.findUser = (likelistId) => {
  const Likelist = mongoose.model("likelists");
  return Likelist.findById(likelistId)
    .populate("users")
    .then(likelist => likelist.user)
}

LikelistSchema.statics.findArtists = (likelistId) => {
  const Likelist = mongoose.model("likelists");
  return Likelist.findById(likelistId)
    .populate('artists')
    .then(likelist => likelist.artists);
}

LikelistSchema.statics.findSongs = (likelistId) => {
  const Likelist = mongoose.model("likelists");
  return Likelist.findById(likelistId)
    .populate('songs')
    .then(likelist => likelist.songs);
}

module.exports = mongoose.model('likelists', LikelistSchema);