import React from 'react';

const SongItem = (song) => {
  return (
    <div className='song-item'>
      <div className='song-image'>
      </div>
      <div className='song-info'>
        <p className='info-name'>{song.title}</p>
        <p className='info-type'>{song.artist.name}</p>
      </div>
    </div>
  );
}

export default SongItem;