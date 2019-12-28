import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

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
  }

  render() {
    return (
      // <div>
        <Query query={Queries.FETCH_GENRE} variables={{id: this.props.match.params.genreId}}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            
            return (
              <div className="genre-show-main">
                <h1 className="genre-index-header">
                  {data.genre.name}

                  {/* <Query query={Queries.CURRENT_USER}>
                    {({ loading, error, data}) => {
                      if (loading) return null;
                      if (error) return <p>Error</p>;
                      const {currentUser} = data;
                      console.log(currentUser);
                      return (
                        <div></div>
                      )
                    }}

                  </Query> */}




                  <Mutation mutation={PLAY_GENRE_MUTATION}>
                    {
                      playGenreMutation => {
                        if (this.state.playingGenre) {
                        return null;
                      }
                        return (
                            <i 
                            // className="fas fa-play-circle"
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
      // </div>
    )
  }
}

export default GenreShow;