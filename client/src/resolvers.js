const resolvers = {
  Mutation: {
    openNewPlaylistModalMutation: (_, args, { cache }) => {
      cache.writeData({
        data: { isModalOpen: true, modalType: "newPlaylist" }
      });
      return null;
    },
    openNewPlaylistSongModalMutation: (_, args, { cache }) => {
      cache.writeData({
        data: { isModalOpen: true, modalType: "newPlaylistSong" }
      });
      return null;
    },

    closeModalMutation: (_, args, { cache }) => {
      cache.writeData({ data: { isModalOpen: false, modalType: null } });
      return null;
    },


    playSongMutation: (_, args, { cache }) => {
      cache.writeData({ 
        data: { currentMusic: { id: args.id, musicType: "song", __typename: "SongType" } } 
      });
      // console.log(cache);
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