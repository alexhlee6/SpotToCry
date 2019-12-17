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

  update(field, client){
    return e => this.setState({ [field]: e.currentTarget.value});
  }

  onSongFetch(songs){
    return this.setState( {songs: songs});
  }

  render(){



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
                  onChange={async () => {
                    const {data} = await client.query({
                      query: FETCH_ALL_SONGS
                    })
                    debugger;
                    const songs = data.songs.map(({ id, title, }) => (
                        <li key={id}>
                          <h4>{title}</h4>
                        </li>
                      ))
                    debugger;
                    this.onSongFetch(songs);
                  }}
                />
              </div>
            <div className='search-results'>
              <ul>
                {this.state.songs}
              </ul>
            </div>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default SearchBar;