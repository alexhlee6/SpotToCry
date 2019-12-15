import React from "react";
import ReactDOM from 'react-dom'
import { rainCloud } from "../../util/loading_cloud";

class MusicPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playlist: [],
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
      playlist: [
        {
          id: "testId",
          url: "https://www.dl.dropboxusercontent.com/s/hfmwrjo31nt7wl8/Juice%20WRLD%20_Lucid%20Dreams%20%28Forget%20Me%29_%20%28Official%20Audio%29.mp3?dl=0",
          title: "Lucid Dreams",
          photoUrl: "https://images.genius.com/6803c74ff169fe7b56de0d5da36d1aef.640x640x1.jpg"
        }
      ]
    });
  }

  componentDidUpdate() {
    window.player = document.getElementById('player');
    if (window.player) {
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
    if (window.player) {

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
          <source src={this.state.playlist[0].url} type="audio/mpeg" />
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
            onClick={ () => this.playNext }
          ></i>
          <i className="fas fa-volume-up"></i>
          <input type="range" id="volume" onChange={this.changeVolume} />
        </div>
      ) : (
        ""
      )
    );

    let currentSong;
    if (this.state.playlist.length > 0) {
      currentSong = this.state.playlist[0];
    }

    let currentSongTitle = (
      this.state.playlist.length > 0 ? (
        <div className="music-player-current-title">
          {this.state.playlist[0].title}
        </div> 
      ) : (
        <div>
          <div className="music-player-current-title-none">
            No Song Selected
          </div>
        </div>
      )
    );

    let currentSongModule = (
      <div className="current-song-module">
        <div className="current-song-photo-container">
          {currentSong ? (
            <img className="current-song-photo" src={currentSong.photoUrl} /> 
          ) : "" }
        </div>
      </div>
    )

 
    return (
      <div>
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