import React from "react";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import gql from "graphql-tag";

const { FETCH_PLAYLISTS } = Queries;

const PLAY_PLAYLIST_MUTATION = gql`
  mutation {
    playPlaylistMutation(id: $id) @client
  }
`;

const PlaylistIndex = () => {
  return (
    <Query query={FETCH_PLAYLISTS}>
      {({ loading, error, data }) => {        
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        
        let userPlaylists = data.playlists.map(({ _id, title, songs }) => {
        let songCount = songs.length;
        let playlistArt;
          if (songCount > 0) {
            playlistArt = (
              <img src={songs[0].imageUrl}></img>
            );
          } else {
            playlistArt = (
              <img src="https://www.andrewwkmusic.com/wp-content/uploads/2014/05/No-album-art-itunes.jpg"></img>
            );
          }
          return (
            <div key={title} className="album-artist-container">
              <div className="image-hover-container">
                <div className="playlist-idx-cover-container">
                  <div className="playlist-art-container">
                    {playlistArt}
                  </div>
                </div>
                <div className="Mike">
                  {songCount > 0 &&
                    <Mutation mutation={PLAY_PLAYLIST_MUTATION}>
                      {playPlaylistMutation => (
                      <button
                        id="Mike-button"
                        onClick={() => {
                          playPlaylistMutation({
                            variables: {
                              id: _id
                            }
                          });
                        }}
                      >
                        <img id="Mike" src="https://spottocry.s3-us-west-1.amazonaws.com/play_white.png" />
                      </button>
                      )}
                    </Mutation>
                  }
                </div>
              </div>
              <Link
                id="playlist-grid-title"
                to={`/playlists/${_id}`}
              >
                <div className="title-container">{title}</div>
              </Link>
            </div>
          );
        });

        return <div className="playlist-index-container">{userPlaylists}</div>;
      }}
    </Query>
  );
};

export default PlaylistIndex;
