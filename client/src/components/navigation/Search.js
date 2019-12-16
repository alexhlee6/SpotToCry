import React from 'react';
import { Query } from "react-apollo";
import queries from '../../graphql/queries';
const {FETCH_SONGS, FETCH_ARTISTS} = queries;

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      search: '',
      songs: ''
    }
    this.update = this.update.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidUpdate(){
    this.updateSearch();
  }

  componentDidMount(){
    return(<Query query={FETCH_SONGS}>
      {({ data }) => {
        console.log(data.songs);
        return this.setState({ songs: data.songs });
      }}
    </Query>)
  }

  update(field){
    return e => this.setState({ [field]: e.currentTarget.value});
  }

  updateSearch(){
    return (<Query query={FETCH_SONGS}>
      {({ data }) => {
        return this.setState({ songs: data.songs});
      }}
    </Query>)
  }

  render(){
    return (
      <div className='search'>
        <div className='search-bar'>
          <div className='search-image'>  
          </div>
          <input
            className='search-input'
            onChange={this.update('search')
              // this.updateSearch();
            }
            value={this.state.search}
            placeholder='Search for Artists or Songs'
          />
          
        </div>
        <div className='search-results'>
          {this.state.songs}
        </div>
      </div>
    )
  }
}

export default SearchBar;