import React from 'react';
import { Link } from 'react-router-dom';

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
    <Link to={`artists/${artist._id}`}>
      <div className='artist-item'
        onClick={ () => console.log(`Navigate to ${artist.name} show page`)}>
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
    </Link>
  );
}

export default ArtistItem;