import React, { Component } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { Query, ApolloConsumer } from "react-apollo";
// import Queries from "../graphql/queries";

class NavBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='SideBar'>
        <div className='SideBar-Logo'>
          SpotToCry
        </div>
        <div className='User-Nav'>
          <div className='nav-home'>Home</div>
          <div className='nav-search'>Search</div>
          <div className='nav-library'>Your Library</div>
        </div>
        <div className='User-Playlists'>
          <div className='nav-playlist-title'>
            PLAYLISTS
          </div>
          <div className='create-playlist'>
            Create Playlist
          </div>
          <div className='playlists'>

          </div>
        </div>
      </div>
    )
  }
}

export default NavBar;