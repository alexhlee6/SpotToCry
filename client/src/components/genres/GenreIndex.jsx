import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";

class GenreIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="genre-index-main">
        <h1 className="genre-index-header">Genres</h1>

        <Query query={Queries.FETCH_ALL_GENRES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            console.log(data.genres);
            return (
              <ul className="genre-index-list">
                { 
                  data.genres.map(genre => {
                    return (
                      <li key={genre._id} className="genre-index-item">
                        <Link to={`/genres/${genre._id}`} className="genre-index-item-link">
                          <p className="genre-index-item-name">{ genre.name }</p>
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            )
          }}
        </Query>

      </div>
    )
  }
}

export default GenreIndex;