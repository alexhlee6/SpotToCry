import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const { DELETE_PLAYLIST } = Mutations;
const { FETCH_PLAYLIST } = Queries;

class PlaylistShow extends React.Component {

  render() {
    debugger;
    return (
      <Query query={FETCH_PLAYLIST} variables={{ id: this.props.match.params.playlistId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error}</p>;
          debugger;
            return (
              <div>
                {/* <h1>TEST!!!</h1> */}
                <h1>{data.playlist.title}</h1>
                
              </div>
            );
        }}
      </Query>
    );
  };
}

export default PlaylistShow;
