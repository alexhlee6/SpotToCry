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

class PlaylistIndex extends React.Component {
  constructor(props) {
    super(props);

    this.setImages = this.setImages.bind(this);
    this.createImages = this.createImages.bind(this);
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
        <div className="playlist-art-container">
          <img src={songImages[0]} alt="" />
        </div>
      );
    } else if (songImages.length >= 4) {
      return songImages.slice(0, 4).map(img => {
        return (
          <div key={img} className="playlist-idx-coverArt-item">
            <img src={img} alt=""/>
          </div>
        );
      });
    } else {
      return (
        <div className="playlist-art-container">
          <img src="https://www.andrewwkmusic.com/wp-content/uploads/2014/05/No-album-art-itunes.jpg" />
        </div>
      );
    }
  }

  render() {
    // debugger;
    return (
      <div className="playlist-index-main">
        <h1 className="genre-index-header">
          <span className="artist-banner-name">Playlists</span>
        </h1>
        <Query query={FETCH_PLAYLISTS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error}</p>;

            let userPlaylists = data.playlists.map(({ _id, title, songs }) => {
              let songCount = songs.length;
              // let playlistArt;
              // if (songCount > 0) {
              //   playlistArt = <img src={songs[0].imageUrl}></img>;
              // } else {
              //   playlistArt = (
              //     <img src="https://www.andrewwkmusic.com/wp-content/uploads/2014/05/No-album-art-itunes.jpg"></img>
              //   );
              // }
              return (
                <div key={title} className="album-artist-container">
                  <div className="image-hover-container">
                    <div className="playlist-idx-cover-container">
                      {this.setImages(songs)}
                    </div>
                    <div className="Mike">
                      {songCount > 0 && (
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
                              <img
                                id="Mike"
                                src="https://spottocry.s3-us-west-1.amazonaws.com/play_white.png"
                                alt=""
                              />
                            </button>
                          )}
                        </Mutation>
                      )}
                    </div>
                  </div>
                  <Link id="playlist-grid-title" to={`/playlists/${_id}`}>
                    <div className="title-container">{title}</div>
                  </Link>
                </div>
              );
            });

            return (
              <div className="playlist-index-container">{userPlaylists}</div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default PlaylistIndex;
