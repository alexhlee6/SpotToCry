import React from "react";

class CurrentSongShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.song;
  }


  render() {
    let photo;
    if (this.state.photoUrl) {
      photo = <img className="current-song-photo" src={this.state.photoUrl} /> 
    }

    let mainInfo;
    if (this.state.title) {
      mainInfo = (
        <div>
          <p>{this.state.title}</p>
          <p>{this.state.artist}</p>
        </div>
      )
    }

    return (
      <div className="current-song-photo-container">
        { photo }
        { mainInfo }
      </div>
    )
  }
}

export default CurrentSongShow;