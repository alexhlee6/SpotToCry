import React from "react";
import PropTypes from "prop-types";
// import "./ModalContent.css";
import AddPlaylistSong from "../playlists/add_song_to_playlist";


const AddPlaylistSongModalContent = ({ close }) => {
  return (
  <div>
    <AddPlaylistSong/>
  </div>
)};

AddPlaylistSongModalContent.propTypes = {
  close: PropTypes.func.isRequired
};

export default AddPlaylistSongModalContent;
