import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";
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
                <button
                onClick={e => {
                  e.preventDefault();
                  localStorage.removeItem("auth-token");
                  client.writeData({ data: { isLoggedIn: false } });
                  // debugger
                  props.history.push("/");
                }}
                >
                  Logout
                </button>
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