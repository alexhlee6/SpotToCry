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
          if (loading) return <p className="current-song-load-err">Loading...</p>;
          if (error) return <p className="current-song-load-err">Error</p>;

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
                      <ul>
                      {data.song.artist.genres.map(
                        genre => <li key={genre._id}>{genre.name}</li>
                      )}
                      </ul>
                    </div>
                    <div className="current-artist-description">
                      <p>
                        {/* {data.song.artist.description} */}
                        {data.song.artist._id === "5e0534bd2ba87036631c6603" ? (
                          "22-year-old Eli Raybon has quickly established himself as a sci-fi weirdo auteur. The staunch non-conformist is now priming his most alluring release yet: a fully-fledged, sci-fi concept album called Supertoys. The record is pure retro-futurism, combining cyberpunk storytelling and disco beats with a myriad of analog synth work."
                        ) : (
                          data.song.artist.description
                        )}
                      </p>

                      <div
                        className="current-song-show-more-button"
                        onClick={() => this.setState({ bSide: false })}
                      >
                        Back to Song
                      </div>
                    </div>
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
