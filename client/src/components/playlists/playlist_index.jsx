import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Queries from "../../graphql/queries";
const { FETCH_PLAYLISTS } = Queries;

const PlaylistIndex = () => {
  return (
    <div>
      <Link to="/new">Create Playlist</Link>
      <Query query={FETCH_PLAYLISTS}>
        {({ loading, error, data }) => {        
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error}</p>;
          return (
            <div>
              <ul>
                {data.playlists.map(({ _id, title, description }) => (
                  <li key={_id}>
                    <Link to={`/playlists/${_id}`}>
                      <h4>{title}</h4>
                    </Link>
                    <p>Description: {description}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default PlaylistIndex;
