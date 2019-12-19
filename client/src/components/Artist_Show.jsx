import React from 'react';

class ArtistShow extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const artistId = window.location.href.split('/')[5];
    
    return(
      <div>
        {`Welcome to the ${artistId} show page!`}
      </div>
    );
  }
}

export default ArtistShow;