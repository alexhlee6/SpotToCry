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

  updateCache(cache, { data }) {
    let playlists;
    try {
      playlists = cache.readQuery({ query: FETCH_PLAYLISTS });
    } catch (err) {
      return;
    }

    if (playlists) {
      let playlistArray = playlists.playlists;
      let newPlaylist = data.newPlaylist;
      cache.writeQuery({
        query: FETCH_PLAYLISTS,
        data: { playlists: playlistArray.concat(newPlaylist) }
      });
    }
  }

  handleSubmit(e, newPlaylist) {
    e.preventDefault();
    let title = this.state.title;

    newPlaylist({
      variables: {
        title: title,
        description: this.state.description
      }
    }).then(data => {
      this.setState({
        message: `New playlist "${title}" created successfully`,
        title: "",
        description: ""
      });
    });
  }

  render() {
    return (
      <Mutation
        mutation={NEW_PLAYLIST}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newPlaylist, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, newPlaylist)}>
              <input
                onChange={this.update("title")}
                value={this.state.title}
                placeholder="New Playlist"
              />
              <textarea
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="description"
              />
              <button type="submit">Create</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default PlaylistCreate;
