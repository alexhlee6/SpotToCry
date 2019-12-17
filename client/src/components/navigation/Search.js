import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import queries from '../../graphql/queries';
const {FETCH_ALL_SONGS} = queries;

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      search: '',
      songs: []
    }
    this.update = this.update.bind(this);
    this.onSongFetch = this.onSongFetch.bind(this);
  }

  update(e){
    this.setState({ search: e.currentTarget.value});
  }

  onSongFetch(songs){
    const filtered = [];
    for(let i = 0; i < songs.length; i++){
      if (songs[i].title.includes(this.state.search)){
        filtered.push(songs[i]);
      }
    }
    if (this.state.search === '') {
      return this.setState( {songs: songs} );
    }
    return this.setState( {songs: filtered});
  }

  render(){
    const searched = this.state.songs.map(({ id, title, }) => (
      <li key={id}>
        <h4>{title}</h4>
      </li>
    ));

    return (
      <ApolloConsumer>
        {client => ( 
          <div className='search'>
            <div className='search-bar'>
              <div className='search-image'>  
                </div>
                  <input
                    className='search-input'
                    placeholder='Search for Artists or Songs'
                    onChange={(e) => {
                      this.update(e)
                      const {data} = client.query({
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
                {searched}
              </ul>
            </div>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default SearchBar;