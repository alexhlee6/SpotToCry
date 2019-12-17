import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const OPEN_MODAL_MUTATION = gql`
  mutation {
    openModalMutation @client
  }
`;

const OpenModalButton = () => (
  <Mutation mutation={OPEN_MODAL_MUTATION}>
    {openModal => <button onClick={openModal}>Open modal</button>}
  </Mutation>
);

export default OpenModalButton;
