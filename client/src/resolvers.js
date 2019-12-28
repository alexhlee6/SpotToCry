const resolvers = {
  Mutation: {
    openNewPlaylistModalMutation: (_, args, { cache }) => {
      cache.writeData({
        data: { songId: null, isModalOpen: true, modalType: "newPlaylist" }
      });
      return null;
    },
    openNewPlaylistSongModalMutation: (_, args, { cache }) => {
      cache.writeData({
        data: { songId: args.id, isModalOpen: true, modalType: "newPlaylistSong" }
      });
      return null;
    },

    closeModalMutation: (_, args, { cache }) => {
      cache.writeData({ data: { isModalOpen: false, modalType: null } });
      return null;
    },


    playSongMutation: (_, args, { cache }) => {
      Object.keys(cache.data.data).forEach(key =>
        key.match(/^currentMusic/) && cache.data.delete(key)
      );
      cache.writeData({ 
        data: { currentMusic: { id: args.id, musicType: "song", __typename: "SongType" } } 
      });

      let currentMusic = { id: args.id, musicType: "song", __typename: "SongType" };
      window.localStorage.setItem("currentMusic", JSON.stringify(currentMusic));
      return null;
    },

    playPlaylistMutation: (_, args, {cache}) => {
      cache.writeData({ 
        data: { currentMusic: { id: args.id, musicType: "playlist", __typename: "PlaylistType"} } 
      });
      let currentMusic = { id: args.id, musicType: "playlist", __typename: "PlaylistType" };
      window.localStorage.setItem("currentMusic", JSON.stringify(currentMusic));
      return null;
    },

    playGenreMutation: (_, args, {cache}) => {
      cache.writeData({
        data: { currentMusic: { id: args.id, musicType: "genre", __typename: "GenreType" } }
      });
      let currentMusic = { id: args.id, musicType: "genre", __typename: "GenreType" };
      window.localStorage.setItem("currentMusic", JSON.stringify(currentMusic));
      return null;
    },

    playLikedSongs: (_, args, {cache}) => {
      cache.writeData({
        data: { currentMusic: { id: args.id, musicType: "likedSongs", __typename: "SongType" }}
      });
      let currentMusic = { id: args.id, musicType: "likedSongs", __typename: "SongType" };
      window.localStorage.setItem("currentMusic", JSON.stringify(currentMusic));
      return null;
    }
  }
};

export default resolvers;