import React from 'react';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='search'>
        <div className='search-bar'>
          <div className='search-image'>  
          </div>
          <input
            className='search-input'
            placeholder='Search for Artists or Songs'
          />
          
        </div>
        <div className='search-results'>
          I am the Search Component!
        </div>
      </div>
    )
  }
}

export default SearchBar;