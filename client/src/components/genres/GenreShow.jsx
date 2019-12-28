import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import Mutations from "../../graphql/mutations";

const OPEN_MODAL_MUTATION = gql`
  mutation {
    openNewPlaylistSongModalMutation(id: $id) @client
  }
`;

const PLAY_SONG_MUTATION = gql`
  mutation {
    playSongMutation(id: $id) @client
  }
`

const PLAY_GENRE_MUTATION = gql`
  mutation {
    playGenreMutation(id: $id) @client
  }
`

class GenreShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playingGenre: false,
      playingSongId: null
    };
    this.renderLikeButton = this.renderLikeButton.bind(this);
  }

  renderLikeButton(songId, song) {
    let currentUserId = this.state.currentUserId;
    
    if (!song.likes.includes(currentUserId)) {
      return (
        <Mutation 
          mutation={Mutations.ADD_SONG_LIKE}
          refetchQueries={[
            {
              query: Queries.FETCH_LIKED_SONGS,
              variables: { id: this.state.currentUserId }
            }
          ]}
        >
          {addSongLike => (
            <i className="far fa-heart" onClick={() => {
              addSongLike({
                variables: {
                  songId, 
                  userId: currentUserId
                }
              });
            }}>
            </i>
          )}
        </Mutation>
      )
    } else {
      return (
        <Mutation 
          mutation={Mutations.REMOVE_SONG_LIKE}
          refetchQueries={[
            {
              query: Queries.FETCH_LIKED_SONGS,
              variables: { id: this.state.currentUserId }
            }
          ]}
        >
          {removeSongLike => (
            <i className="fas fa-heart" onClick={() => {
              removeSongLike({
                variables: {
                  songId,
                  userId: currentUserId
                }
              });
            }}>
            </i>
          )}
        </Mutation>
      )
    }
  }

  render() {
    return (
        <Query query={Queries.FETCH_GENRE} variables={{id: this.props.match.params.genreId}}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            
            return (
              <div className="genre-show-main">
                <h1 className="genre-index-header">
                  {data.genre.name}

                  { this.state.currentUserId ? (
                    <span></span>
                  ) : (
                    <Query query={Queries.CURRENT_USER}>
                      {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return <p>Error</p>;
                        if (data) {
                          this.setState({currentUserId: data.currentUser})
                        }
                        return (
                          <span></span>
                        )
                      }}
                    </Query>
                  )}

                  <Mutation mutation={PLAY_GENRE_MUTATION}>
                    {
                      playGenreMutation => {
                        if (this.state.playingGenre) {
                        return null;
                      }
                        return (
                            <i 
                            className="fas fa-random"
                            onClick={() => {
                              playGenreMutation(
                                { variables: { id: data.genre._id } }
                              );
                              this.setState({playingGenre: true, playingSongId: null});
                            }}
                          ></i>
                        )
                      }
                    }
                  </Mutation>
                </h1>

                <ul className="genre-artists-list">
                  {
                    data.genre.artists.map(artist => {
                      return (
                        <li key={artist._id} className="genre-artists-item">
                          <ul className="genre-artist-song-list">
                            {
                              artist.songs.map(song => {
                                return (
                                  <li
                                    key={song._id}
                                    className="genre-artist-song-item"
                                  >
                                    <Mutation mutation={PLAY_SONG_MUTATION}>
                                      {
                                        playSongMutation => {
                                          if (this.state.playingSongId === song._id) {
                                            return <div className="fa-play-circle-hidden"></div>;
                                          }
                                          return (
                                            <i
                                              className="fas fa-play-circle"
                                              onClick={() => {
                                                playSongMutation(
                                                  { variables: { id: song._id } }
                                                );
                                                this.setState({ playingSongId: song._id, playingGenre: false });
                                              }}
                                            ></i>
                                          );
                                        }
                                      }
                                    </Mutation>
                                    <div>
                                      {this.state.currentUserId ? (
                                        this.renderLikeButton(song._id, song)
                                      ) : null}
                                    </div>
                                    <span className={this.state.playingSongId !== song._id ? "genre-artist-song-title" :"genre-artist-song-title-playing"}>
                                      {song.title}
                                    </span>
                                    <span className="genre-artist-item-name">
                                      <Link to={`/artists/${artist._id}`}>
                                        {artist.name}
                                      </Link>
                                    </span>
                                    <Mutation mutation={OPEN_MODAL_MUTATION}>
                                      {openNewPlaylistSongModalMutation => {
                                        return (
                                        <span
                                          className="genre-song-add-button"
                                          onClick={() => {
                                            openNewPlaylistSongModalMutation(
                                              { variables: { id: song._id } }
                                            )
                                          }}
                                        >
                                          Add to Playlist +
                                        </span>
                                      )}}
                                    </Mutation>
                                  </li>
                                );
                              })
                            }
                          </ul>
                        </li>
                      )
                    })
                  }
                  
                </ul>
              </div>
            )
          }}
        </Query>
    )
  }
}

export default GenreShow;