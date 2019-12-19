import gql from "graphql-tag";

export default {
  NEW_PLAYLIST: gql`
    mutation NewPlaylist($title: String, $description: String) {
      newPlaylist(title: $title, description: $description) {
        _id
        title
        description
      }
    }
  `,
  DELETE_PLAYLIST: gql`
    mutation DeletePlaylist($id: ID) {
      deletePlaylist(id: $id) {
        _id
      }
    }
  `,
  ADD_PLAYLIST_SONG: gql`
    mutation AddPlaylistSong($playlistId: ID, $songId: ID) {
      addPlaylistSong(playlistId: $playlistId, songId: $songId) {
        _id
        title
        songs {
          _id
          title
          artist {
            _id
            name
          }
        }
      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        email
        token
        loggedIn
      }
    }
  `
};
