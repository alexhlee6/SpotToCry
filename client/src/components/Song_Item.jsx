import React from 'react';

const SongItem = (song) => {
  return (
    <div className='song-item'>
      <div className='song-image'>
      </div>
      <div className='song-info'>
        {song.title}
        {song.artist.name}
      </div>
    </div>
  );
}

export default SongItem;