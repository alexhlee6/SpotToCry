const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Song = mongoose.model("songs");
const Artist = mongoose.model("artists");
const ArtistType = require('./artist_type');

const SongType = new GraphQLObjectType({
  name: "SongType",
  
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    artist: {
      type: ArtistType,
      resolve(parentValue) {
        return Artist.findById(parentValue.artist)
          .then(artist => artist)
          .catch(err => console.log(err))
      }
    },
    imageUrl: { type: GraphQLString },
    songUrl: { type: GraphQLString }
  })
});

module.exports = SongType;