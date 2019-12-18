import React from "react";
import { Link } from "react-router-dom";
// import { Query, ApolloConsumer } from "react-apollo";
// import Queries from "../graphql/queries";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const OPEN_MODAL_MUTATION = gql`
  mutation {
    openNewPlaylistModalMutation @client
  }
`;

class NavBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="SideBar">
        <div className="SideBar-Logo">SpotToCry</div>
        <div className="User-Nav">
          <div className="nav-home">
            <Link to="/" className="home-link">
              <div className="nav-home-image"></div>
              Home
            </Link>
          </div>
          <div className="nav-search">
            <Link to="/search" className="search-link">
              <div className="nav-search-image"></div>
              Search
            </Link>
          </div>
          <div className="nav-library">
            <div className="nav-library-image"></div>
            Your Library
          </div>
        </div>
        <div className="User-Playlists">
          <div className="nav-playlist-title">PLAYLISTS</div>
          <div className="create-playlist">
            <div className="create-playlist-image"></div>
            <Mutation mutation={OPEN_MODAL_MUTATION}>
              {openNewPlaylistModalMutation => (                
                <div className="create-playlist-title" onClick={openNewPlaylistModalMutation}>
                  Create Playlist
                </div>
              )}
            </Mutation>
          </div>
          <div className="playlists"></div>
        </div>
      </div>
    );
  }
}

export default NavBar;