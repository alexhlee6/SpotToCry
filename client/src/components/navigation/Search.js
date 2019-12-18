import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import queries from '../../graphql/queries';
const {FETCH_ALL_SONGS} = queries;

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      search: '',
      songs: [],
      artists: []
    }
    this.update = this.update.bind(this);
    this.onSongFetch = this.onSongFetch.bind(this);
  }

  update(e){
    this.setState({ search: e.currentTarget.value});
  }

  onSongFetch(songs){
    const filteredSongs = [];
    const filteredArtists = [];
    const artists = [];

    for (let i = 0; i < songs.length; i++) {
      debugger;
      if (songs[i].title.includes(this.state.search)) {
        filteredSongs.push(songs[i]);
      }
      if (songs[i].artist.name.includes(this.state.search)) {
        filteredArtists.push(songs[i].artist);
      }
      artists.push(songs[i].artist);
    }
    if (this.state.search === '') {
      return this.setState({ artists: artists, songs: songs })
    }
    this.setState({ artists: filteredArtists, songs: filteredSongs })
  }

  render(){
    const searchedSongs = this.state.songs.map(({ id, title, }) => (
      <li key={id}>
        <h4>{title}</h4>
      </li>
    ));

    const searchedArtists = this.state.artists.map(({ id, name, }) => (
      <li key={id}>
        <h4>{name}</h4>
      </li>
    ))

    return (
      <ApolloConsumer>
        {client => {
          if (this.state.songs.length === 0){
          const { data } = client.query({
              query: FETCH_ALL_SONGS
            }).then((data) => {
              if (this.state.search.length === 0){
                this.onSongFetch(data.data.songs)
              }})};

          return (
            <div className='search'>
              <div className='search-bar'>
                <div className='search-image'>
                </div>
                <input
                  className='search-input'
                  placeholder='Search for Artists or Songs'
                  onChange={(e) => {
                    this.update(e)
                    const { data } = client.query({
                      query: FETCH_ALL_SONGS
                    }).then((data) => {
                    this.onSongFetch(data.data.songs)
                    })
                  }}
                  value={this.state.search}
                />
              </div>
              <div className='search-results'>
                <ul>
                  {searchedSongs}
                </ul>
                <ul>
                  {searchedArtists}
                </ul>
              </div>
            </div>
          )
        }}
      </ApolloConsumer>
    );
  }
}

export default SearchBar;