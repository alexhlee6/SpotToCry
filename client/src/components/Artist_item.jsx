import React from 'react';

const ArtistItem = (artist) => {
  return (
    <div className='artist-item'>
      <div className='artist-image'>
      </div>
      <div className='artist-info'>
        {artist.name}
        <p>Artist</p>
      </div>
    </div>
  );
}

export default ArtistItem;