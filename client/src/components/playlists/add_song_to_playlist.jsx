import React from "react";
import PropTypes from "prop-types";

const AddSongToPlaylist = ({closeModal}) => (
  <div className="Modal">
    <h2>Add song to playlist</h2>

    <button className="CloseButton" onClick={closeModal}>
      Close
    </button>
  </div>
);

AddSongToPlaylist.propTypes = {
  close: PropTypes.func.isRequired
};

export default AddSongToPlaylist;

