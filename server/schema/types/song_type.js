const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
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
    songUrl: { type: GraphQLString },
    likes: {
      type: new GraphQLList(require("./user_type")),
      resolve(parentValue) {
        return Song.findById(parentValue._id)
          .then(song => song.likes)
      }
    }
  })
});

module.exports = SongType;