import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./auth/Login";
import GenreIndex from "./genres/GenreIndex";
import AuthRoute from "../util/route_util";
import Nav from "./navigation/Nav";
import Register from "./auth/Register";
import SideBar from './navigation/SideBar';
import MusicPlayer from "./player/MusicPlayer";
import Search from './navigation/Search';
import Account from './navigation/Account';
import SplashPage from "./Splash";



const App = () => {
  return (
    <div className='full-app'>
      <AuthRoute path='/' component={SideBar} routeType='protected' />
      <br />
      <div className='app-content'>
        <AuthRoute path='/' component={Nav} routeType='protected' />
        <Switch>
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
          <AuthRoute exact path='/search' component={Search} routeType='protected' />
          <AuthRoute exact path='/account' component={Account} routeType='protected' />       
          <AuthRoute exact path="/" component={GenreIndex} routeType="protected"/>
        </Switch>        
      </div>
        <AuthRoute path="/" component={MusicPlayer} routeType="protected" />
    </div>
  );
};

export default App;
