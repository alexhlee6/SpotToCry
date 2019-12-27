const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Likelist = mongoose.model("likelists");
const UserType = require('./user_type');
const User = mongoose.model("users");

const LikelistType = new GraphQLObjectType({
  name: "LikelistType",

  fields: () => ({
    _id: { type: GraphQLID },
    user: { 
      type: require("./user_type"),
      resolve(parentValue) {
        return Likelist.findUser(parentValue.id);
    }},
    songs: {
      type: new GraphQLList(require("./song_type")),
      resolve(parentValue) {
        return Likelist.findSongs(parentValue.id);
      }
    },
    artists: {
      type: new GraphQLList(require("./artist_type")),
      resolve(parentValue) {
        return Likelist.findArtists(parentValue.id);
      }
    }
  })
});

module.exports = LikelistType;