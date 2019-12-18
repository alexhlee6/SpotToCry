const resolvers = {
  Mutation: {
    openModalMutation: (_, args, { cache }) => {
      cache.writeData({ data: { isModalOpen: true } });
      return null;
    },
    closeModalMutation: (_, args, { cache }) => {
      cache.writeData({ data: { isModalOpen: false } });
      return null;
    }
  }
};

export default resolvers;