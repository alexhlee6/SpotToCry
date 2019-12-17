import React from "react";
import { rainCloud } from "../../util/loading_cloud";
import CurrentSongShow from "./CurrentSongShow";

class MusicPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playlist: [],
      prevSongs: [],
      playing: false,
      minimized: true,
      volume: 0.5
    };
    this.playNext = this.playNext.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: false,
      playlist: this.props.playlist
    });
  }

  componentDidUpdate() {
    window.player = document.getElementById('player');
    
    if (window.player) {
      window.player.addEventListener("ended", this.playNext);
      window.player.addEventListener("play", () => this.setState({ playing: true }));
      window.player.addEventListener("pause", () => this.setState({ playing: false }));
      window.player.volume = this.state.volume;
      document.getElementById('playpause').onclick = function () {
        if (window.player.paused) {
          window.player.play();
        } else {
          window.player.pause();
        }
      }
    }
  }

  playNext() {
    let length = this.state.playlist.length;
    let prevSongs = [...this.state.prevSongs];
    if (this.state.playlist[0]) {
      prevSongs.push(this.state.playlist[0]);
    }

    if (length === 1) {
      window.player.pause();
      if (prevSongs[0]) {
        window.player.src = prevSongs[0].songUrl;
      }
      window.player.load();
      window.player.play();
      this.setState({ playlist: prevSongs, prevSongs: [] });

    } else {

      let newList = this.state.playlist.slice(1);
      window.player.pause();
      if (newList[0]) {
        window.player.src = newList[0].songUrl
        window.player.load();
        window.player.play();
      }
      this.setState({ playlist: newList, prevSongs: prevSongs });
    }
  }

  changeVolume(e) {
    if (window.player) {
      window.player.volume = ( e.currentTarget.value / 100 );
      this.setState({ volume: e.currentTarget.value / 100 });
    }
  }


  render() {
    let musicPlayer;
    if (this.state.playlist.length > 0) {
      musicPlayer = (
        <audio className="music-player" id="player">
          <source src={this.state.playlist[0].songUrl} type="audio/mpeg" />
        </audio>
      )
    } else {
      musicPlayer = (
        <audio className="music-player" id="player">
        </audio>
      )
    }

    let playOrPause = (
      this.state.playing ? (
        <i className="fas fa-pause"
          id="playpause"
          onClick={() => this.setState({ playing: false })}
        ></i>
      ) : (
        <i className="fas fa-play"
          id="playpause"
          onClick={() => this.setState({ playing: true })}
        ></i>
      )
    );

    let fastForward = (
      this.state.playlist.length > 0 ? (
        <div>
          <i className="fas fa-forward"
            id="forward"
            onClick={ this.playNext }
          ></i>
        </div>
      ) : (
        ""
      )
    );

    let volume;
    if (this.state.playlist.length > 0) {
      if (this.state.volume === 0) {
        volume = (
          <div className="volume-container">
            <i 
              className="fas fa-volume-off"
              onClick={ () => this.setState({ volume: 0.5 }) }
            ></i>
            <input
              type="range"
              id="volume"
              onChange={this.changeVolume}
              value={this.state.volume * 100}
            />
          </div>
        )
      } else if (this.state.volume < 0.6) {
        volume = (
          <div className="volume-container">
            <i
              className="fas fa-volume-down"
              onClick={() => this.setState({ volume: 0 })}
            ></i>
            <input
              type="range"
              id="volume"
              onChange={this.changeVolume}
              value={this.state.volume * 100}
            />
          </div>
        )
      } else {
        volume = (
          <div className="volume-container">
            <i
              className="fas fa-volume-up"
              onClick={() => this.setState({ volume: 0 })}
            ></i>
            <input
              type="range"
              id="volume"
              onChange={this.changeVolume}
              value={this.state.volume * 100}
            />
          </div>
        )
      }
    }

    let currentSong;
    if (this.state.playlist.length > 0) {
      currentSong = this.state.playlist[0];
    }

    let currentSongTitle = (
      this.state.playlist.length > 0 ? (
        <div className="music-player-current-title">
          { currentSong.title }
        </div> 
      ) : (
        <div>
          <div className="music-player-current-title-none">
            No Song Selected
          </div>
        </div>
      )
    );


    // console.log(this.state.playlist);

    let currentSongModule = (
      <div className="current-song-module">
        {
          this.state.playlist.length > 0 ? (
            <CurrentSongShow 
              songId={currentSong._id}
            />
          ) : (
            ""
          )
        }
      </div>
    )

 
    return (
      <div className="music-player-main-main">
        {this.state.minimized ? ( 
          "" 
        ) : ( 
          <div 
            className="music-player-modal"
            onClick={() => this.setState({ minimized: true })}>
            {rainCloud}
          </div>
        )}

        <div className="music-player-main">
          <div className="music-player-minimized">
            <div className="music-player-left">
              {musicPlayer}
              <div className="music-play-button-container">
                { playOrPause }
                { fastForward }
                { volume } 
              </div>
              {currentSongTitle}
            </div>
            <div className="music-player-right">
              <i 
                className="fas fa-bars music-player-hambuger"
                onClick={() => {
                  this.state.minimized ? (
                    this.setState({ minimized: false })
                  ) : (
                    this.setState({ minimized: true })
                  )
                }}
              ></i>
            </div>
          </div>
          
          { this.state.minimized ? (
            <div className="music-player-current-song-show minimized">
              { currentSongModule }
            </div>
          ) : (
            <div className="music-player-current-song-show">
              { currentSongModule }
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MusicPlayer;