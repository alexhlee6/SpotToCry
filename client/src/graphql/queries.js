import gql from "graphql-tag";

export default {
  FETCH_SONGS: gql`
    query FetchSongs {
      songs {
        id
        artist
        title
      }
    }
  `,
  FETCH_PLAYLIST: gql`
    query FetchPlaylist($id: ID!) {
      playlist(id: $id) {
        _id
        title
        description
        songs {
          _id
          artist
          title
        }
      }
    }
  `,
  FETCH_PLAYLISTS: gql`
    query FetchPlaylists {
      playlists {
        _id
        title
        description
        songs {
          _id
          artist {
            _id
            name
          }
          title
        }
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }`
};
