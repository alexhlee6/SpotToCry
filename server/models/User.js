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
  date: {
    type: Date,
    default: Date.now
  },
  likelist: {
    type: Schema.Types.ObjectId,
    ref: "likelists"
  }
});

UserSchema.statics.findLikelist = (userId) => {
  const User = mongoose.model("users");
  return User.findById(userId)
    .populate('likelists')
    .then(user => user.likelist);
}

module.exports = mongoose.model("users", UserSchema);
