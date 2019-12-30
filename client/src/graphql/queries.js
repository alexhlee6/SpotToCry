import gql from "graphql-tag";

export default {
  CURRENT_USER: gql`
    query CurrentUser {
      currentUser @client,
      isLoggedIn @client
    }
  `,
  FETCH_PLAYLIST: gql`
    query FetchPlaylist($id: ID!) {
      playlist(_id: $id) {
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
          imageUrl
          songUrl
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
        user {
          name
          _id
        }
        songs {
          _id
          artist {
            _id
            name
          }
          title
          imageUrl
          songUrl
        }
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_ALL_SONGS: gql` 
    query FetchAllSongs {
      songs {
        _id
        title
        imageUrl
        songUrl
        artist {
          _id
          name
          imageUrl
        }
      }
    }
  `,
  FETCH_ALL_ARTISTS: gql` 
    query FetchAllArtists {
      artists {
        _id
        name
        imageUrl
        songs {
          _id
          title
          likes
        }
        genres {
          _id
          name
        }
      }
    }
  `,
  FETCH_ALL_GENRES: gql` 
    query FetchAllGenres {
      genres {
        _id
        name
        imageUrl
        artists {
          _id
          name
          imageUrl
        }
      }
    }
  `,

  FETCH_ARTIST: gql`
    query FetchArtist($id: ID!) {
      artist(_id: $id) {
        _id
        name
        songs {
          _id
          name
        }
        genres {
          _id
          name
        }
        imageUrl
        description
      }
    }
  `,
  FETCH_GENRE: gql`
    query FetchGenre($id: ID!) {
      genre(_id: $id) {
        _id
        name
        imageUrl
        artists {
          _id
          name
          imageUrl
          songs {
            _id
            title
            likes
          }
        }
      }
    }
  `,
  FETCH_SONG: gql`
    query FetchSong($id: ID!) {
      song(_id: $id) {
        _id
        title
        songUrl
        imageUrl
        artist {
          _id
          name
          imageUrl
          description
          genres {
            _id
            name
          }
        }
      }
    }
  `,
  FETCH_FILTERED_SONGS: gql`
  query FetchFilteredSongs($filter: String!) {
    feed{
      songs {
        _id
        title
        imageUrl
        songUrl
        artist {
          _id
          name
          imageUrl
        }
      }
    }
  }
`,
  FETCH_GENRE_SONGS: gql`
    query FetchGenreSongs($id: ID!) {
      genre(_id: $id) {
        _id
        name
        artists {
          _id
          songs {
            _id
            title
            songUrl
            imageUrl
            likes
          }
        }
      }
    }
  `,
  FETCH_LIKED_SONGS: gql`
    query FetchLikedSongs($id: ID!) {
      user(_id: $id) {
        _id
        email
        likedSongs {
          _id
          title
          imageUrl
          songUrl
          artist {
            _id
            name
            imageUrl
          }
          likes
        }
      }
    }
  `,
};

