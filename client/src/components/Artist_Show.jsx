import React from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ApolloConsumer, Query } from 'react-apollo';
import queries from '../graphql/queries';
const { FETCH_ALL_ARTISTS } = queries;

const OPEN_MODAL_MUTATION = gql`
  mutation {
    openNewPlaylistSongModalMutation @client
  }
`;

const PLAY_SONG_MUTATION = gql`
  mutation {
    playSongMutation(id: $id) @client
  }
`

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

            const artistSongs = this.artist.songs.map((song) => (
              <li key={song.id} className='artist-song'>
                <div className='artist-song-info'>
                  <div className='artist-song-play'>
                    <div className='artist-play-btn'>
                      <Mutation mutation={PLAY_SONG_MUTATION}>
                        {
                          playSongMutation => {
                            return (
                              <i
                                className="fas fa-play-circle"
                                onClick={() => {
                                  playSongMutation(
                                    { variables: { id: song._id } }
                                  )
                                }}
                              ></i>
                            )
                          }
                        }
                      </Mutation>
                    </div>
                    <p className='artist-song-title'>{song.title}</p>
                  </div>
                  <p className='artist-song-name'>{this.artist.name}</p>
                  <Mutation mutation={OPEN_MODAL_MUTATION}>
                    {openNewPlaylistSongModalMutation => {
                      return (
                        <span
                          className="genre-song-add-button"
                          onClick={openNewPlaylistSongModalMutation}
                        >
                          Add to Playlist +
                                        </span>
                      )
                    }}
                  </Mutation>
                </div>
              </li>
            )); 
            
            return (
              <div className='artist-show'>
                <div className='artist-banner'>
                  <div className='artist-banner-info'>
                    <p className='artist-banner-name'>{this.artist.name}</p>
                  </div>
                  <div className='artist-pic' style={banner}>
                  </div>
                </div>
                <div className='artist-songs'>
                  <ul className='artist-song-list'>
                    {artistSongs}
                  </ul>
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