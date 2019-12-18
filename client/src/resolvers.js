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
    }
  }
};

export default resolvers;