import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import gql from "graphql-tag";

const { REMOVE_PLAYLIST_SONG } = Mutations;

const PLAY_SONG_MUTATION = gql`
  mutation {
    playSongMutation(id: $id) @client
  }
`;

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
            <Mutation mutation={PLAY_SONG_MUTATION}>
              {playSongMutation => (
                <img
                  id="tc-note"
                  src={this.state.noteIcon}
                  onClick={() => {
                    playSongMutation({
                      variables: { id: song._id }
                    });
                  }}
                />
              )}
            </Mutation>
          </div>
        </div>
        <div className="tc-title-artist">
          <div className="tc-title">{song.title}</div>
          <div className="tc-artist"><Link to={`/artists/${song.artist._id}`}>{song.artist.name}</Link></div>
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
