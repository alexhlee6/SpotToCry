const mongoose = require("mongoose");
const graphql = require("graphql");
const { 
  GraphQLObjectType, GraphQLString, 
  GraphQLInt, GraphQLID, GraphQLNonNull 
} = graphql;

const UserType = require("./types/user_type");
const AuthService = require("../services/auth");

const ArtistType = require("./types/artist_type");
const Artist = mongoose.model("artists");

const PlaylistType = require("./types/playlist_type");
const Playlist = mongoose.model("playlists");

const SongType = require("./types/song_type");
const Song = mongoose.model("songs");

const GenreType = require("./types/genre_type");
const Genre = mongoose.model("genres");

const LikelistType = require("./types/likelist_type");
const Likelist = mongoose.model("likelists");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newPlaylist: {
      type: PlaylistType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: { type: GraphQLID },
      },
      resolve(_, { title, description, user }) {
        return new Playlist({ title, description, user }).save();
      }
    },
    deletePlaylist: {
      type: PlaylistType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Playlist.remove({ _id: id });
      }
    },
    updatePlaylist: {
      type: PlaylistType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(_, { id, title, description }) {
        const updateObj = {};

        if (id) updateObj.id = id;
        if (title) updateObj.title = title;
        if (description) updateObj.description = description;

        return Playlist.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, playlist) => {
            return playlist;
          }
        );
      }
    },
    addPlaylistSong: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID },
        songId: { type: GraphQLID }
      },
      resolve(_, { playlistId, songId }) {
        return Playlist.addSong(playlistId, songId);
      }
    },
    removePlaylistSong: {
      type: PlaylistType,
      args: {
        playlistId: { type: GraphQLID },
        songId: { type: GraphQLID }
      },
      resolve(_, { playlistId, songId }) {
        return Playlist.removeSong(playlistId, songId);
      }
    },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },

    newArtist: {
      type: ArtistType,
      args: {
        name: { type: GraphQLString },
        imageUrl: { type: GraphQLString }
      },
      resolve(parentValue, { name, imageUrl }) {
        return new Artist({ name, imageUrl }).save();
      }
    },
    newSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
        artist: { type: GraphQLID },
        imageUrl: { type: GraphQLString },
        songUrl: { type: GraphQLString }
      },
      resolve(parentValue, { title, artist, imageUrl, songUrl }) {
        return new Song({ title, artist, imageUrl, songUrl }).save();
      }
    },
    newGenre: {
      type: GenreType,
      args: {
        name: { type: GraphQLString },
        imageUrl: { type: GraphQLString }
      },
      resolve(parentValue, { name, imageUrl }) {
        return new Genre({ name, imageUrl }).save();
      }
    },

    addArtistSong: {
      type: ArtistType,
      args: {
        artistId: { type: new GraphQLNonNull(GraphQLID) },
        songId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { artistId, songId }) {
        return Artist.addSong(artistId, songId);
      }
    },
    addArtistGenre: {
      type: ArtistType,
      args: {
        artistId: { type: new GraphQLNonNull(GraphQLID) },
        genreId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { artistId, genreId }) {
        return Artist.addGenre(artistId, genreId);
      }
    }
  }
});

module.exports = mutation;
