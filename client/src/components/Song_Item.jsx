import React from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const PLAY_SONG_MUTATION = gql`
  mutation {
    playSongMutation(id: $id) @client
  }
`

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
      <div className='song-image' style={songStyle}>
        <Mutation mutation={PLAY_SONG_MUTATION}>
          {
            playSongMutation => {
              return (
                <div className='song-click' onClick={() => {
                  playSongMutation(
                    { variables: { id: song._id } }
                  )
                }}>
                  <i
                    className="fas fa-play-circle"
                  ></i>
                </div>
              )
            }
          }
        </Mutation>
      </div>
      <div className='song-info'>
        <p className='info-name'>{song.title}</p>
        <p className='info-type'>{song.artist.name}</p>
      </div>
    </div>
  );
}

export default SongItem;