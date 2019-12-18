import React from "react";
import PropTypes from "prop-types";
import "./ModalContent.scss";
import NewPlaylist from "../playlists/new_playlist";


const ModalContent = ({ close }) => {
  return (
    <div className="modal-background">
      <div className="modal-child-np" onClick={e => e.stopPropagation()}>
        <NewPlaylist closeModal={close} />
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  close: PropTypes.func.isRequired
};

export default ModalContent;
