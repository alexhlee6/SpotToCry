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
        <div className="genre-index-homepage-header">
          <h1 className="genre-index-header homepage-header">
            <span className="artist-banner-name">
              Explore
          </span></h1>
        </div>
        <Query query={Queries.FETCH_ALL_GENRES}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return <p>Error</p>;
            
            return (
              <ul className="genre-index-list">
                { 
                  data.genres.map((genre, i) => {
                    return (
                      <li key={genre._id} className="genre-index-item">
                        <img src={genre.imageUrl} className="genre-index-item-image"/>
                        <Link to={`/genres/${genre._id}`} className="genre-index-item-link">
                          <p className="genre-index-item-name">{ genre.name }</p>
                        </Link>
                      </li>
                    )
                  })
                }
                <li className="genre-index-item-hidden"></li>
                <li className="genre-index-item-hidden"></li>
                <li className="genre-index-item-hidden"></li>
                <li className="genre-index-item-hidden"></li>
              </ul>
            )
          }}
        </Query>

      </div>
    )
  }
}

export default GenreIndex;