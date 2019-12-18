import React from 'react';

const SongItem = song = {
  render(){
    return (
      <div className='song-item'>
        {song.title}
      </div>
    )
  }
}

export default SongItem;