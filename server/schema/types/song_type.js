const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const SongType = new GraphQLObjectType({
  name: "SongType",
  
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    artist: { type: GraphQLID },
    imageUrl: { type: GraphQLString },
    songUrl: { type: GraphQLString }
  })
});

module.exports = SongType;