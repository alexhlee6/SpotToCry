import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import ModalContent from "./ModalContent";

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

const Modal = () => (
  <Query query={MODAL_QUERY}>
    {({ data }) =>
      data.isModalOpen && (
        <Mutation mutation={CLOSE_MODAL_MUTATION}>
          {closeModal => <ModalContent close={closeModal} />}
        </Mutation>
      )
    }
  </Query>
);

export default Modal;
