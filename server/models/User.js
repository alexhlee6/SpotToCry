const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'playlists'
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics.findPlaylists = (userId) => {
  return mongoose.model("users").findById(userId)
    .populate('playlists')
    .then(user => user.playlists);
}

module.exports = mongoose.model("users", UserSchema);
