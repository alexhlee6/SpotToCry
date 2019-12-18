import React, { Component } from "react";

class AddSongToPlaylist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { closeModal } = this.props;

    return (
      <div className="Modal">
        <h2>Add song to playlist</h2>

        <button className="CloseButton" onClick={closeModal}>
          Close
        </button>
      </div>
    );
  }
};


export default AddSongToPlaylist;

