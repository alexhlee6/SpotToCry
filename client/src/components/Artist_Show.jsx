import React from 'react';
import { ApolloConsumer, Query } from 'react-apollo';
import queries from '../graphql/queries';
const { FETCH_ALL_ARTISTS } = queries;

class ArtistShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      songs: []
    }
  }

  render(){
    const artistId = window.location.href.split('/').slice(-1)[0];
    
    
    return(
      <div>
        <Query query={FETCH_ALL_ARTISTS}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            for(let i = 0; i < data.artists.length; i++){
              if (data.artists[i]._id === artistId){
                this.artist = data.artists[i];
              }
            }
            const banner = {
              background: `url(${this.artist.imageUrl}) no-repeat`,
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%'   
            }
            return (
              <div className='artist-show'>
                <div className='artist-banner'>
                  <div className='artist-banner-info'>
                  </div>
                  <div className='artist-pic' style={banner}>
                  </div>
                </div>
                <div className='artist-songs'>

                </div>
              </div>
             );
          }}
        </Query>
      </div>
      
    );
  }
}

export default ArtistShow;