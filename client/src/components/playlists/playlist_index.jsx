import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Queries from "../../graphql/queries";
const { FETCH_PLAYLISTS } = Queries;

const PlaylistIndex = () => {
  return (
    <div>
      <Link to="/new">Create Playlist</Link>
      <ul>
        <Query query={FETCH_PLAYLISTS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error}</p>;
            console.log(data);
            return data.playlists.map(({ id, title, description }) => (
              <li key={id}>
                <Link to={`/playlists/${id}`}>
                  <h4>{title}</h4>
                </Link>
                <p>Description: {description}</p>
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default PlaylistIndex;
