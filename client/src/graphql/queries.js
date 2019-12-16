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
        id
        title
        description
        songs {
          id
          artist
          title
        }
      }
    }
  `,
  FETCH_PLAYLISTS: gql`
    query FetchPlaylists {
      playlists {
        id
        title
        description
        songs {
          id
          artist
          title
        }
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
};
