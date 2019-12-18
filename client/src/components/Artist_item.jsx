import React from 'react';

const ArtistItem = (artist) => {
  return (
    <div className='artist-item'>
      <div className='artist-image'>
      </div>
      <div className='artist-info'>
        <p className='info-name'>{artist.name}</p>
        <p className='info-type'>Artist</p>
      </div>
    </div>
  );
}

export default ArtistItem;