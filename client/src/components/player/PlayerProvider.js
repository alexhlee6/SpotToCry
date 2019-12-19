import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import MusicPlayer from "./MusicPlayer";
import gql from "graphql-tag";

// store playlist ID directly on the cache (pass in playlistID)
// provider either queries cache (apolloconsumer) - client.readQuery(currentId)
// 

const CURRENT_MUSIC_QUERY = gql`
  query {
    currentMusic {
      id
      musicType
    }
  }
`;


const PlayerProvider = () => {

  return (
    // <Query query={Queries.FETCH_ALL_SONGS}>

    <Query query={CURRENT_MUSIC_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <MusicPlayer playlist={[]} />;
        if (error) return <MusicPlayer playlist={[]} />;
        console.log(data.currentMusic);

        if (data.currentMusic.musicType === "song") {
          return (
            <Query query={Queries.FETCH_SONG} variables={ { id: data.currentMusic.id } }>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;

                return <MusicPlayer playlist={[data.song]} playing={true} />
              }}
            </Query>
          )


        } else if (data.currentMusic.musicType === "playlist") {

        } else {
          return <MusicPlayer playlist={[]} />
        }





        // return <MusicPlayer playlist={data.songs} />
      }}
    </Query>
  )
}

export default PlayerProvider;