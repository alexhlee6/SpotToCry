require("../../models");
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const ArtistType = require("./artist_type");
const GenreType = require("./genre_type");
const SongType = require("./song_type");
const PlaylistType = require("./playlist_type");

const User = mongoose.model("users");
const Artist = mongoose.model("artists");
const Genre = mongoose.model("genres");
const Song = mongoose.model("songs");
const Playlist = mongoose.model("playlists");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    playlists: {
      type: new GraphQLList(PlaylistType),
      resolve() {
        return Playlist.find({});
      }
    },
    playlist: {
      type: PlaylistType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Playlist.findById(id);
      }
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve() {
        return Artist.find({});
      }
    },
    artist: {
      type: ArtistType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Artist.findById(args._id);
      }
    },
    genres: {
      type: new GraphQLList(GenreType),
      resolve() {
        return Genre.find({});
      }
    },
    genre: {
      type: GenreType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Genre.findById(args._id);
      }
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({});
      }
    },
    song: {
      type: SongType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Song.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;
