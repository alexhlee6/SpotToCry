import React from "react";
import { Query, Mutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const PLAY_SONG_MUTATION = gql`
  mutation {
    playSongMutation(id: $id) @client
  }
`;
const OPEN_MODAL_MUTATION = gql`
  mutation {
    openNewPlaylistSongModalMutation(id: $id) @client
  }
`;

const PLAY_LIKED_SONGS = gql`
  mutation {
    playLikedSongs(id: $id) @client
  }
`;

class FavoritesIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUserId: null,
      likedSongs: null
    }
    this.getLikedSongs = this.getLikedSongs.bind(this);
    this.renderTrashIcon = this.renderTrashIcon.bind(this);
  }

  getLikedSongs() {
    return (
      <Query 
        query={Queries.FETCH_LIKED_SONGS}
        variables={{id: this.state.currentUserId}}
      >
        {({loading, error, data}) => {
          if (loading) return null;
          if (error) return <p>Error</p>;
          
          const { user } = data;
          if (this.state.likedSongs !== user.likedSongs) {
            this.setState({ likedSongs: user.likedSongs });
          }
          return null;
        }}
      </Query>
    )
  }

  renderTrashIcon(songId, song) {
    let currentUserId = this.state.currentUserId;

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
          
          <i className="far fa-trash-alt" onClick={() => {
            removeSongLike({
              variables: {
                songId,
                userId: currentUserId
              }
            });
            let currentlyLiked = this.state.likedSongs;
            let newLikedSongs = [];
            for (let i = 0; i < currentlyLiked.length; i++) {
              if (currentlyLiked[i]._id !== songId) {
                newLikedSongs.push(currentlyLiked[i]);
              }
            }
            this.setState({ likedSongs: newLikedSongs });
          }}>
          </i>
        )}
      </Mutation>
    )
  }

  render() {
    return (
      <div className="favorites-index-main">
        <h1 className="genre-index-header">
          <span className="favorite-songs-header">
            Liked Songs
          </span>
          <Mutation 
            mutation={PLAY_LIKED_SONGS}
            variables={{ id: this.state.currentUserId }}
          >
            {
              playLikedSongs => {
                if (!this.state.currentUserId) {
                  return null;
                }
                return (
                  <span className="favorite-songs-play"
                    onClick={() => {
                      playLikedSongs(
                        { variables: { id: this.state.currentUserId } }
                      );
                      this.setState({ playingLikedSongs: true });
                    }}
                  >PLAY ALL</span>
              )}
            }
          </Mutation>
          
        </h1>

        {this.state.currentUserId ? (
          <div></div>
          ) : (
          <Query query={Queries.CURRENT_USER}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;

              if (data) {
                this.setState({currentUserId: data.currentUser});
              }
              return null;
            }}
          </Query>
        )}

        {(this.state.currentUserId && !this.state.likedSongs) ? (
          this.getLikedSongs() ) : null }

        {
          this.state.likedSongs ? (
            <ul className="genre-artist-song-list favorites-list">
              {this.state.likedSongs.map(song => {
                return (
                  <li
                    key={song._id}
                    className="genre-artist-song-item favorites-item"
                  >
                    <Mutation mutation={PLAY_SONG_MUTATION}>
                      {
                        playSongMutation => {
                          if (this.state.playingSongId === song._id) {
                            return <i
                              className="fas fa-play-circle hidden"></i>
                          }
                          return (
                            <i
                              className="fas fa-play-circle"
                              onClick={() => {
                                playSongMutation(
                                  { variables: { id: song._id } }
                                );
                                this.setState({ 
                                  playingSongId: song._id, playingGenre: false 
                                });
                              }}
                            ></i>
                          );
                        }
                      }
                    </Mutation>
                    
                    <span className={this.state.playingSongId !== song._id ? "genre-artist-song-title" : "genre-artist-song-title-playing"}>
                      {song.title}
                    </span>
                    <span className="genre-artist-item-name">
                      <Link to={`/artists/${song.artist._id}`}>
                        {song.artist.name}
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
                        )
                      }}
                    </Mutation>
                    {this.state.currentUserId ? (
                      this.renderTrashIcon(song._id, song)
                    ) : null}
                  </li>
                )
              })}
            </ul>
          ) : (
            null
          )
        }

      </div>
    )
  }
}

export default FavoritesIndex;