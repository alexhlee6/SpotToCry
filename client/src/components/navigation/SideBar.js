import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const { FETCH_PLAYLISTS, CURRENT_USER } = Queries;

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
        <div className="SideBar-Logo">
          <div className="logo-image"></div>
          <p className="logo-text">SpotToCry</p>
        </div>
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
            <Link to="/library/playlists" className="library-link">
              <div className="nav-library-image"></div>
              Your Library
            </Link>
          </div>
        </div>
        <div className="User-Playlists">
          <div className="nav-playlist-title">PLAYLISTS</div>
          <div className="create-playlist">
            <div className="create-playlist-image"></div>
            <Mutation mutation={OPEN_MODAL_MUTATION}>
              {openNewPlaylistModalMutation => (
                <div
                  className="create-playlist-title"
                  onClick={openNewPlaylistModalMutation}
                >
                  Create Playlist
                </div>
              )}
            </Mutation>
          </div>
          <div className="playlists">
            <Query query={CURRENT_USER}>
              {({ loading, error, data }) => {
                if (loading) return <option>Loading...</option>;
                if (error) return <option>{error}</option>;
                const { currentUser } = data;
                return (
                  <Query query={FETCH_PLAYLISTS} pollInterval={200} x>
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error</p>;
                      return data.playlists.map(({ _id, title, user }) => {
                        if (user._id === currentUser) {
                          return (
                            <Link key={_id} to={`/playlists/${_id}`}>
                              <div key={title} className="playlist-item">
                                {title}
                              </div>
                            </Link>
                          )
                        }
                      });
                    }}
                  </Query>
                )
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;