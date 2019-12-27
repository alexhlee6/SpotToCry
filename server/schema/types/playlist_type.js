const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const SongType = require("./song_type");
const UserType = require("./user_type");
const Playlist = require("../../models/Playlist");
const User = require("../../models/User");

const PlaylistType = new GraphQLObjectType({
  name: "PlaylistType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parentValue) {
        return Playlist.findById(parentValue.id)
          .populate("songs")
          .then(playlist => playlist.songs);
      }
    },
    user: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then(user => user)
          .catch(err => console.log(err))
      }
    }
  })
});

module.exports = PlaylistType;
