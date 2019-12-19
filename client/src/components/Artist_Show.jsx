import React from 'react';

class ArtistShow extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      console.log(`Welcome to the ${window.location.pathname} show page!`)
    );
  }
}

export default ArtistShow;