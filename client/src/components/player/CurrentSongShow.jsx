import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";

class CurrentSongShow extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      songId: this.props.songId,
      bSide: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        songId: this.props.songId,
        bSide: false
      })
    }
  }

  render() {
    return (
      <Query query={ Queries.FETCH_SONG } variables={{ id: this.state.songId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          if (!this.state.bSide) {
            return (
              <div className="current-song-show-main">
                <div className="current-song-show-A">
                  <div className="current-song-image-container">
                    <img className="current-song-image" 
                      src={data.song.imageUrl} 
                      onClick={() => this.setState({ bSide: true })}
                    />
                  </div>
                  <div className="current-song-info">
                    <p className="current-song-info-title">
                      {data.song.title}
                    </p>
                    <p className="current-song-info-artist">
                      {data.song.artist.name}
                    </p>
                  </div>
                  <div
                    className="current-song-show-more-button"
                    onClick={() => this.setState({ bSide: true })}
                  >
                    About {data.song.artist.name}
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div className="current-song-show-main">
                <div className="current-song-show-B">
                  <div className="current-song-image-container">
                    <img className="current-song-image" 
                      src={data.song.artist.imageUrl} 
                      onClick={() => this.setState({ bSide: false })}
                    />
                  </div>
                  <div className="current-artist-info">
                    <p className="current-song-info-title">
                      {data.song.artist.name}
                    </p>
                    <div className="current-artist-genres">
                      {data.song.artist.genres.map(
                        genre => <p>{genre.name}</p>
                      )}
                    </div>
                    <p className="current-artist-description">
                      <p>
                        {data.song.artist.description}
                      </p>

                      <div
                        className="current-song-show-more-button"
                        onClick={() => this.setState({ bSide: false })}
                      >
                        Back to Song
                      </div>
                    </p>
                  </div>
                  
                </div>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default CurrentSongShow;
