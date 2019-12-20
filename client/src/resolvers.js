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
      ) //not sure if this one is doing anything
      cache.writeData({ 
        data: { currentMusic: { id: args.id, musicType: "song", __typename: "SongType" } } 
      });
      return null;
    },

    playPlaylistMutation: (_, args, {cache}) => {
      cache.writeData({ 
        data: { currentMusic: { id: args.id, musicType: "playlist", __typename: "PlaylistType"} } 
      });
      return null;
    }
  }
};

export default resolvers;