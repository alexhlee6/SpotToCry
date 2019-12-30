import React from "react";
import { withRouter } from 'react-router-dom';
import PlaylistShowItem from "./playlist_show_item";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import gql from "graphql-tag";

const { DELETE_PLAYLIST } = Mutations;
const { FETCH_PLAYLIST } = Queries;

const PLAY_PLAYLIST_MUTATION = gql`
  mutation {
    playPlaylistMutation(id: $id) @client
  }
`;

class PlaylistShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.setImages = this.setImages.bind(this);
    this.createImages = this.createImages.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible
    }));
  }

  setImages(playlistSongs) {
    let songImages = [];
    if (playlistSongs !== undefined) {
      songImages = playlistSongs.map(song => {
        return song.imageUrl;
      });
    }
    return this.createImages(songImages);
  }

  createImages(songImages) {
    if (songImages.length >= 1 && songImages.length < 4) {
      return (
        <div className="playlist-coverArt-single">
          <img src={songImages[0]} />
        </div>
      );
    } else if (songImages.length >= 4) {
      return songImages.slice(0, 4).map(img => {
        return (
          <div key={img} className="playlist-coverArt-item">
            <img src={img} />
          </div>
        );
      });
    } else {
      return (
        <div className="playlist-coverArt-single">
          <img src="https://www.andrewwkmusic.com/wp-content/uploads/2014/05/No-album-art-itunes.jpg" />
        </div>
      );
    }
  }

  render() {
    return (
      <Query
        query={FETCH_PLAYLIST}
        variables={{ id: this.props.match.params.playlistId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div className="playlist-show-main"></div>;
          if (error) return <p>{error}</p>;
          let playlistSongs;
          let songs = data.playlist.songs;
          let songCount = data.playlist.songs.length;
          let { menuVisible } = this.state;
          // let playlistArt;
          // if (data.playlist.songs.length > 0) {
          //   playlistArt = <img src={data.playlist.songs[0].imageUrl}></img>;
          // } else {
          //   playlistArt = (
          //     <img src="https://www.andrewwkmusic.com/wp-content/uploads/2014/05/No-album-art-itunes.jpg"></img>
          //   );
          // }

          if (data.playlist.songs.length > 0) {
            playlistSongs = data.playlist.songs.map(song => {
              return (
                <PlaylistShowItem
                  key={song._id}
                  song={song}
                  playlistId={this.props.match.params.playlistId}
                />
              );
            });
          } else {
            playlistSongs = "";
          }

          return (
            <div className="playlist-show-main">
            <div className="playlist-show-c1">
              <div className="playlist-show-c2">
                <section id="album-show-section">
                  <div className="fluid-container">
                    <div className="fluid">
                      <div className="album-show-c3a">
                        <div className="album-show-c3a-content">
                          <div className="album-show-c3a-content-header">
                            <div className="cover-art-info">
                              <div className="cover-art-shadow">
                                <div>
                                  <div className="playlist-cover-container">
           
                                      {this.setImages(songs)}
                
                                  </div>
                                </div>
                                <button id="cover-art-play" />
                              </div>
                              <div className="album-title-container">
                                <span>{data.playlist.title}</span>
                              </div>
                              {/* todo: send current user down to associate with playlist */}
                              {/* <div className="album-artist">Demo User</div>  */}
                            </div>
                          </div>
                          {songCount > 0 && (
                            <Mutation mutation={PLAY_PLAYLIST_MUTATION}>
                              {playPlaylistMutation => (
                                <div
                                  className="album-show-left-play"
                                  onClick={() => {
                                    playPlaylistMutation({
                                      variables: {
                                        id: this.props.match.params.playlistId
                                      }
                                    });
                                  }}
                                >
                                  Play
                                </div>
                              )}
                            </Mutation>
                          )}
                          <div>
                            <div className="album-show-c3a-bottom">
                              <p>
                                {songCount ? songCount : 0}
                                {songCount != 1 ? " SONGS" : " SONG"}
                              </p>
                              <div
                                className="context-menu-ellipses"
                                title="More"
                                onClick={this.toggleMenu}
                              >
                                ...
                              </div>
                              <Mutation mutation={DELETE_PLAYLIST}>
                                {deletePlaylist => (
                                  <div
                                    id="context-menu"
                                    className={
                                      menuVisible
                                        ? "context-menu-show"
                                        : "context-menu-hidden"
                                    }
                                    onClick={() => {
                                      deletePlaylist({
                                        variables: {
                                          id: this.props.match.params.playlistId
                                        }
                                      })
                                        .then(() =>
                                          this.props.history.push(
                                            "/library/playlists"
                                          )
                                        )
                                        .catch(err => {
                                          console.log(err);
                                        });
                                    }}
                                  >
                                    <div className="context-menu-item">
                                      Delete
                                    </div>
                                  </div>
                                )}
                              </Mutation>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="album-show-c3b">{playlistSongs}</div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(PlaylistShow);
