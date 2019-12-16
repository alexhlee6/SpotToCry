import React from "react";

class CurrentSongShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.song;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(this.props.song)
    }
  }

  render() {
    let image;
    if (this.state.imageUrl) {
      image = <img className="current-song-image" src={this.state.imageUrl} /> 
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
      <div className="current-song-image-container">
        { image }
        { mainInfo }
      </div>
    )
  }
}

export default CurrentSongShow;