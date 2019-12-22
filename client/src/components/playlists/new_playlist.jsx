import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const { NEW_PLAYLIST } = Mutations;
const { FETCH_PLAYLISTS } = Queries;


class PlaylistCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      title: "",
      description: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newPlaylist) {
    e.preventDefault();
    let title = this.state.title;
    newPlaylist({
      variables: {
        title: title,
        description: this.state.description
      }
    });
  }

  render() {
    let { closeModal } = this.props;

    return (
      <Mutation mutation={NEW_PLAYLIST}>
        {(newPlaylist, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, newPlaylist)}>
              <div className="modal-container">
                <button className="btn-transparent" onClick={closeModal}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Close</title>
                    <path
                      d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143"
                      fill="#fff"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
                <h1 id="new-playlist-header">Create new playlist</h1>
                <div className="new-playlist-input-container">
                  <div className="new-playlist-input-box">
                    <div className="new-playlist-content-spacing">
                      <h4 className="new-playlist-inputBox-label">
                        Playlist Name
                      </h4>
                      <input
                        type="text"
                        onChange={this.update("title")}
                        className="new-playlist-inputBox-input"
                        value={this.state.title}
                        placeholder="New Playlist"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-buttons">
                  <button className="modal-button-cancel" onClick={closeModal}>
                    CANCEL
                  </button>
                  <button className="modal-button-create" type="submit">
                    CREATE
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default PlaylistCreate;
