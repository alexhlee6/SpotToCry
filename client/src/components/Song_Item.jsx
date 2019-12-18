import React from 'react';

const SongItem = (song) => {
  const songStyle = {
    marginTop: '20px',
    height: '130px',
    width: '130px',
    backgroundImage: `url(${song.imageUrl})`,
    backgroundSize: 'cover'
  }
  return (
    <div className='song-item'>
      <div className='song-image'
        onClick={() => console.log(`Now playing ${song.title}`)}
        style={songStyle}
      >
        <div 
          className='song-image-hover'
        >
        </div>
      </div>
      <div className='song-info'>
        <p className='info-name'>{song.title}</p>
        <p className='info-type'>{song.artist.name}</p>
      </div>
    </div>
  );
}

export default SongItem;