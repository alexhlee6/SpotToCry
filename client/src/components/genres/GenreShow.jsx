import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const OPEN_MODAL_MUTATION = gql`
  mutation {
    openNewPlaylistSongModalMutation @client
  }
`;

class GenreShow extends React.Component {



  render() {
    return (
      <div>
        <Query query={Queries.FETCH_GENRE} variables={{id: this.props.match.params.genreId}}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            console.log(data.genre);
            return (
              <div className="genre-show-main">
                <h1 className="genre-index-header">{data.genre.name}</h1>
                <ul className="genre-artists-list">
                  {
                    data.genre.artists.map(artist => {
                      return (
                        <li key={artist._id} className="genre-artists-item">
                          {/* <p className="genre-artists-item-name">{artist.name}</p> */}
                          <ul className="genre-artist-song-list">
                            {
                              artist.songs.map(song => {
                                return (
                                  <li
                                    key={song._id}
                                    className="genre-artist-song-item"
                                  >
                                    <span className="genre-artist-song-title">
                                      {song.title}
                                    </span>
                                    <span className="genre-artist-item-name">
                                      {artist.name}
                                    </span>
                                    <Mutation mutation={OPEN_MODAL_MUTATION}>
                                      {openNewPlaylistSongModalMutation => {
                                        return (
                                        <span
                                          className="genre-song-add-button"
                                          onClick={openNewPlaylistSongModalMutation}
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
      </div>
    )
  }
}

export default GenreShow;