import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./auth/Login";
import GenreIndex from "./genres/GenreIndex";
import AuthRoute from "../util/route_util";
import Nav from "./Nav";
import Register from "./auth/Register";
import MusicPlayer from "./player/MusicPlayer";


const App = () => {
  return (
    <div>
      <Nav />
      <br />

      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />

        <Route exact path="/" component={GenreIndex} />
      </Switch>
      
      <AuthRoute path="/" component={MusicPlayer} routeType="protected" />
    </div>
  );
};

export default App;
