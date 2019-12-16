const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Artist = mongoose.model("artists");
const axios = require("axios");

const ArtistType = new GraphQLObjectType({
  name: "ArtistType",
  
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    songs: { 
      type: new GraphQLList(require("./song_type")),
      resolve(parentValue) {
        return Artist.findSongs(parentValue.id);
      }
    },
    genres: { 
      type: new GraphQLList(require("./genre_type")),
      resolve(parentValue) {
        return Artist.findGenres(parentValue.id);
      }
    },
    imageUrl: { type: GraphQLString },
    description: { 
      type: GraphQLString,
      resolve(parentValue) {
        return axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${parentValue.name}`)
          .then(res => {
            // console.log(Object.values(res.data.query.pages)[0].extract)
            return Object.values(res.data.query.pages)[0].extract;
          })
      }
    }
  })
});

module.exports = ArtistType;