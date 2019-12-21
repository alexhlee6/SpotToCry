import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";

const { REMOVE_PLAYLIST_SONG } = Mutations;

class PlaylistShowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteIcon: "https://spottocry.s3-us-west-1.amazonaws.com/music_note.png",
      noteContainerClass: "tc-outer-top",
      menuVisible: false
    };

    this.playNote = this.playNote.bind(this);
    this.musicNote = this.musicNote.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  playNote() {
    this.setState({
      noteIcon: "https://spottocry.s3-us-west-1.amazonaws.com/play.png",
      noteContainerClass: "tc-outer-top-2"
    });
  }

  musicNote() {
    this.setState({
      noteIcon: "https://spottocry.s3-us-west-1.amazonaws.com/music_note.png",
      noteContainerClass: "tc-outer-top"
    });
  }

  toggleMenu() {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible
    }));
  }

  render() {
    let { menuVisible } = this.state;
    const { song } = this.props;
    let noteContainerClass = this.state.noteContainerClass;
    
    return (
      <div
        onMouseEnter={this.playNote}
        onMouseLeave={this.musicNote}
        className="track-container"
      >
        <div className="tc-outer">
          <div className={noteContainerClass}>
            <img
              id="tc-note"
              src={this.state.noteIcon}
              // onClick={this.handlePlay}
            />
          </div>
        </div>
        <div className="tc-title-artist">
          <div className="tc-title">{song.title}</div>
          <div className="tc-artist">{song.artist.name}</div>
        </div>
        <div className="tc-context-menu" title="More">
          <div className="ellipsis" onClick={this.toggleMenu}>
            ...
          </div>
          <div className={menuVisible ? "cm-show" : "cm-hidden"}>
            <div className="cm-item">
              <Mutation mutation={REMOVE_PLAYLIST_SONG}>
                {removeSong => ( 
                  <div
                  onClick={() => {
                    removeSong({
                      variables: {
                        playlistId: this.props.playlistId,
                        songId: song._id
                      }
                    });
                  }}
                  >
                    Remove Song from Playlist
                  </div>
                )}
              </Mutation>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PlaylistShowItem);
