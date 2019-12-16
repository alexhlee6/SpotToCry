const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Artist = mongoose.model("artists");
const axios = require("axios");
// import { assertValidSDLExtension } from "graphql/validation/validate";

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
        return axios.get(`http://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvprop=content&rvsection=0&titles=${parentValue.name}&props=extracts`)
          .then(res => {
            // console.log(Object.values(res.data.query.pages)[0].extracts)
            // return Object.values(res.data.query.pages[0].extract)
          })
      }
    }
  })
});

module.exports = ArtistType;