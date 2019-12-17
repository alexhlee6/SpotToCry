const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const SongType = require("./song_type");
const Playlist = require("../../models/Playlist");

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
    }
  })
});

module.exports = PlaylistType;
