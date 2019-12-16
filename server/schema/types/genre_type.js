const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Genre = mongoose.model("genres");

const GenreType = new GraphQLObjectType({
  name: "GenreType",

  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    songs: {
      type: new GraphQLList(require("./song_type")),
      resolve(parentValue) {
        return Genre.findSongs(parentValue.id);
      }
    },
    artists: {
      type: new GraphQLList(require("./artist_type")),
      resolve(parentValue) {
        return Genre.findArtists(parentValue.id);
      }
    },
    imageUrl: { type: GraphQLString }
  })
});

module.exports = GenreType;