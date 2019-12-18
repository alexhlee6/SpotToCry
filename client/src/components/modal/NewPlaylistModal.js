import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import NewPlaylistModalContent from "./NewPlaylistModalContent";

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

const NewPlaylistModal = () => (
  <Query query={MODAL_QUERY}>
    {({ data }) =>
      data.isModalOpen && (
        <Mutation mutation={CLOSE_MODAL_MUTATION}>
          {closeModal => <NewPlaylistModalContent close={closeModal} />}
        </Mutation>
      )
    }
  </Query>
);

export default NewPlaylistModal;
