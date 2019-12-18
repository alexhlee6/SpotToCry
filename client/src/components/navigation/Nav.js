import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
const { IS_LOGGED_IN } = Queries;


const Nav = props => {
  return (
    <div className="auth-buttons">
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div 
                  className='account-button'
                  onClick={e => {
                    e.preventDefault();
                    props.history.push('/account')
                  }}
                >
                  Account
                </div>
              );
            } else {
              return (
                <div>
                  <Link to="/login">Login</Link>
                  
                  <Link to="/register">Register</Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
    </div>
  );
};

export default withRouter(Nav);