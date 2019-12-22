import React from "react";
import { rainCloud } from "../../util/loading_cloud";
import CurrentSongShow from "./CurrentSongShow";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";

const CURRENT_MUSIC_QUERY = gql`
  query {
    currentMusic {
      id
      musicType
    }
  }
`;


class MusicPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playlist: [],
      prevSongs: [],
      playing: false,
      minimized: true,
      volume: 0.5,
      nextEventAttached: false
    };
    this.playNext = this.playNext.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.receiveNewPlaylist = this.receiveNewPlaylist.bind(this);
  }


  componentDidMount() {
    if (!window.player) {
      window.player = document.getElementById('player');
      window.player.volume = this.state.volume;
    }
    // this.setState({
    //   playlist: [],
    //   volume: this.state.volume
    // });
  }

  componentDidUpdate() {
    if (window.player && this.state.loading === true) {
      window.player.addEventListener("ended", () => {
        this.playNext();
      });
      this.setState({loading: false})
    }
  }

  receiveNewPlaylist({playlist, musicType, id}) {
    window.player.pause();
    window.player.src = playlist[0].songUrl;
    window.player.volume = this.state.volume;
    window.player.play();
    this.setState({ playlist: playlist, musicType, id, playing: true });
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
    let musicPlayer = (
      <audio className="music-player" id="player">
        <source 
          src={this.state.playlist && this.state.playlist[0] ? this.state.playlist[0].songUrl : null} 
          type="audio/mpeg" 
        />
      </audio>
    );

    let playOrPause = (
      <i 
        className={ window.player && !window.player.paused ? "fas fa-pause" : "fas fa-play"}
        id="playpause"
        onClick={() => {
          if (window.player.paused) {
            window.player.play();
            this.setState(Object.assign(this.state, { playing: true }));
          } else {
            window.player.pause();
            this.setState(Object.assign(this.state, { playing: false }));
          }
        }}
      ></i>
    )

    let fastForward = (
      this.state.playlist && this.state.playlist.length > 0 ? (
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

    
    let volumeInput = (
      <input type="range" id="volume" 
        onChange={this.changeVolume} value={this.state.volume * 100}
      />
    );
    let volumeIcon;
    if (this.state.volume === 0) {
      volumeIcon = (
        <i className="fas fa-volume-off"
        onClick={() => {
          this.setState({ volume: 0.5 });
          window.player.volume = 0.5;
        }}
        ></i>
      )
    } else if (this.state.volume < 0.6) {
      volumeIcon = (
        <i className="fas fa-volume-down"
          onClick={() => {
            this.setState({ volume: 0 });
            window.player.volume = 0;
          }}
        ></i>
      )
    } else {
      volumeIcon = (
        <i
          className="fas fa-volume-up"
          onClick={() => {
            this.setState({ volume: 0 });
            window.player.volume = 0;
          }}
        ></i>
      )
    }

    let volume = (
      <div className="volume-container">
        { volumeIcon }
        { volumeInput }
      </div>
    )


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


    let currentSongModule = (
      <div className="current-song-module">
        { this.state.playlist && this.state.playlist.length > 0 ? (
            <CurrentSongShow 
              songId={currentSong._id}
            />
          ) : (
            <div className="current-song-nothing-selected">No song selected</div>
          ) }
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

        <Query query={CURRENT_MUSIC_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return null;

            if (data.currentMusic.musicType === "song") {
              return (
                <Query
                  query={Queries.FETCH_SONG}
                  variables={{ id: data.currentMusic.id }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;

                    if (this.state.playlist[0] !== data.song) {
                      this.receiveNewPlaylist({
                        playlist: [data.song],
                        musicType: "song",
                        id: data.song._id
                      });
                    }
                    return null;
                  }}
                </Query>
              );
            } else if (data.currentMusic.musicType === "genre") {
              return (
                <Query
                  query={Queries.FETCH_GENRE_SONGS}
                  variables={{ id: data.currentMusic.id }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;

                    if (this.state.id !== data.genre._id) {
                      let newList = [];
                      let artists = data.genre.artists;
                      for (let i = 0; i < artists.length; i++) {
                        let songs = artists[i].songs;
                        for (let j = 0; j < songs.length; j++) {
                          newList.push(songs[j]);
                        }
                      }
                      this.receiveNewPlaylist({
                        playlist: newList,
                        musicType: "genre",
                        id: data.genre._id
                      });
                    }
                    return null;
                  }}
                </Query>
              );
            } else if (data.currentMusic.musicType === "playlist") {
              return (
                <Query
                  query={Queries.FETCH_PLAYLIST}
                  variables={{ id: data.currentMusic.id }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;

                    if (this.state.id !== data.playlist._id) {
                      let newList = [];
                      let songs = data.playlist.songs;
                      for (let i = 0; i < songs.length; i++) {
                        newList.push(songs[i]);
                      }
                      this.receiveNewPlaylist({
                        playlist: newList,
                        musicType: "playlist",
                        id: data.playlist._id
                      });
                    }
                    return null;
                  }}
                </Query>
              );
            } 
              
          }}
        </Query>
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