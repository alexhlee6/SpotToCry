import React from 'react';

const ArtistItem = (artist) => {
  const artistStyle = {
    marginTop: '20px',
    height: '130px',
    width: '130px',
    backgroundImage: `url(${artist.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPostition: 'center'
  }
  return (
    <div className='artist-item'>
      <div 
        className='artist-image'
        style={artistStyle}
        >
      </div>
      <div className='artist-info'>
        <p className='info-name'>{artist.name}</p>
        <p className='info-type'>Artist</p>
      </div>
    </div>
  );
}

export default ArtistItem;