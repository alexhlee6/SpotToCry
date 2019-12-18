import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import AddPlaylistSongModalContent from "./AddPlaylistSongModalContent";

const MODAL_QUERY = gql`
  query {
    isModalOpen @client
  }
`;

const CLOSE_MODAL_MUTATION = gql`
  mutation {
    closeModalMutation @client
  }
`;

const AddPlaylistSongModal = () => (
  <Query query={MODAL_QUERY}>
    {({ data }) =>
      data.isModalOpen && (
        <Mutation mutation={CLOSE_MODAL_MUTATION}>
          {closeModal => <AddPlaylistSongModalContent close={closeModal} />}
        </Mutation>
      )
    }
  </Query>
);

export default AddPlaylistSongModal;
