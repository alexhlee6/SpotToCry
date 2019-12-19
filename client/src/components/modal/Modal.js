import React from "react";
import { Query, Mutation } from "react-apollo";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import "./ModalContent.scss";
import NewPlaylist from "../playlists/new_playlist"
import NewPlaylistSong from "../playlists/add_song_to_playlist";

const MODAL_OPEN_QUERY = gql`
  query {
    isModalOpen @client
  }
`;

const MODAL_TYPE_QUERY = gql`
  query {
    modalType @client,
    songId @client
  }
`;

const CLOSE_MODAL_MUTATION = gql`
  mutation {
    closeModalMutation @client
  }
`;

const Modal = () => (
  <Query query={MODAL_OPEN_QUERY}>
    {({ data }) => {
      if (data.isModalOpen){
        return <Query query={MODAL_TYPE_QUERY}>
          {({ data }) => {
            if (data.modalType === "newPlaylist") {
              return (
                <Mutation mutation={CLOSE_MODAL_MUTATION}>
                  {closeModal => {
                    return (
                      <div className="modal-background">
                        <div
                          className="modal-child-np"
                          onClick={e => e.stopPropagation()}
                        >
                          <NewPlaylist closeModal={closeModal} />
                        </div>
                      </div>
                    );
                  }}
                </Mutation>
              );
            } else if (data.modalType === "newPlaylistSong") {
              return (
                <Mutation mutation={CLOSE_MODAL_MUTATION}>
                  {closeModal => {
                    return (
                      <div className="modal-background">
                        <div
                          className="modal-child-asp"
                          onClick={e => e.stopPropagation()}
                        >
                          <NewPlaylistSong closeModal={closeModal} songId={data.songId}/>
                        </div>
                      </div>
                    );
                  }}
                </Mutation>
              );
            }
        }         
      } 
        </Query>

      } else {
        return null;
      }
    }
  }
  </Query>
);

Modal.propTypes = {
  close: PropTypes.func.isRequired
};

export default Modal;
