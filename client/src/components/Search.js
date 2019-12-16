import React from 'react';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='search'>
        <div className='search-bar'>
          <input
            className='search-input'
            placeholder='Search for Artists or Songs'
          />
          
        </div>
        I am the Search Component!
      </div>
    )
  }
}

export default SearchBar;