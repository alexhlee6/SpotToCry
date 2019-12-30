import React from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ApolloConsumer, Query } from 'react-apollo';
import Mutations from "../graphql/mutations";
import queries from '../graphql/queries';
const { FETCH_ALL_ARTISTS } = queries;

const OPEN_MODAL_MUTATION = gql`
  mutation {
    openNewPlaylistSongModalMutation(id: $id) @client
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
    this.renderLikeButton = this.renderLikeButton.bind(this);
  }

  renderLikeButton(songId, song) {
    let currentUserId = this.state.currentUserId;
    if (!song.likes.includes(currentUserId)) {
      return (
        <Mutation
          mutation={Mutations.ADD_SONG_LIKE}
          refetchQueries={[
            {
              query: queries.FETCH_LIKED_SONGS,
              variables: { id: this.state.currentUserId }
            }
          ]}
        >
          {addSongLike => (
            <i className="far fa-heart" onClick={() => {
              addSongLike({
                variables: {
                  songId,
                  userId: currentUserId
                }
              });
            }}>
            </i>
          )}
        </Mutation>
      )
    } else {
      return (
        <Mutation
          mutation={Mutations.REMOVE_SONG_LIKE}
          refetchQueries={[
            {
              query: queries.FETCH_LIKED_SONGS,
              variables: { id: this.state.currentUserId }
            }
          ]}
        >
          {removeSongLike => (
            <i className="fas fa-heart" onClick={() => {
              removeSongLike({
                variables: {
                  songId,
                  userId: currentUserId
                }
              });
            }}>
            </i>
          )}
        </Mutation>
      )
    }
  }

  render(){
    const artistId = window.location.href.split('/').slice(-1)[0];
    
    return(
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
              <li key={song.id} className='genre-artist-song-item'>
                {/* <div className='artist-song-info'> */}
                  <div className='artist-song-play'>
                    <div className="title-play-like">
                    <div className='artist-play-btn'>
                      {this.state.currentUserId ? (
                        <span></span>
                      ) : (
                          <Query query={queries.CURRENT_USER}>
                            {({ loading, error, data }) => {
                              if (loading) return <div className="genre-show-main"></div>;
                              if (error) return <p>Error</p>;
                              if (data) {
                                this.setState({ currentUserId: data.currentUser })
                              }
                              return (
                                <span></span>
                              )
                            }}
                          </Query>
                        )}
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
                    {this.state.currentUserId ? (
                      this.renderLikeButton(song._id, song)
                    ) : null}
                    <p className='genre-artist-song-title'>{song.title}</p>
                    </div>
                  </div>
                  <p className='genre-artist-item-name'>{this.artist.name}</p>
                  <Mutation mutation={OPEN_MODAL_MUTATION}>
                    {openNewPlaylistSongModalMutation => {
                      return (
                        <span
                          className="genre-song-add-button"
                          onClick={() => openNewPlaylistSongModalMutation(
                            { variables: { id: song._id } }
                          )}
                        >
                          Add to Playlist +
                                        </span>
                      )
                    }}
                  </Mutation>
                {/* </div> */}
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
                  <ul className='genre-artist-song-list'>
                    {artistSongs}
                  </ul>
                </div>
                <div className='artist-songs'>

                </div>
              </div>
             );
          }}
        </Query>
      
    );
  }
}

export default ArtistShow;