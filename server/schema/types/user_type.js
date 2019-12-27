const graphql = require("graphql");
const LikelistType = require("./likelist_type");
const mongoose = require("mongoose");
const Likelist = mongoose.model("likelists");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;
const User = mongoose.model("users");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    likelist: {
      type: LikelistType,
      resolve(parentValue) {
        console.log(parentValue);
        return Likelist.findById(parentValue.likelist)
          .then(likelist => likelist)
          .catch(err => console.log(err))
      }
    },
  
    playlists: {
      type: new GraphQLList(require("./playlist_type")),
      resolve(parentValue) {
        return User.findPlaylists(parentValue.id);
      }
    },
  })
});

module.exports = UserType;
