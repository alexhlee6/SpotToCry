import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./auth/Login";
import GenreIndex from "./genres/GenreIndex";
import AuthRoute from "../util/route_util";
import Nav from "./Nav";
import Register from "./auth/Register";
import SideBar from './SideBar';
import MusicPlayer from "./player/MusicPlayer";
import Search from './Search';
import Account from './Account';
import SplashPage from "./Splash";
import CreatePlaylist from "./playlists/new_playlist";
import PlaylistIndex from "./playlists/playlist_index";
import PlayerProvider from "./player/PlayerProvider";
import GenreShow from "./genres/GenreShow";


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
          <AuthRoute exact path="/new" component={CreatePlaylist} routeType="protected"/>
          <AuthRoute exact path="/library/playlists/" component={PlaylistIndex} routeType="protected"/>       
          <AuthRoute exact path="/" component={GenreIndex} routeType="protected"/>
          <AuthRoute exact path="/genres/:genreId" component={GenreShow} routeType="protected" />
        </Switch>        
      </div>
      <AuthRoute path="/" component={PlayerProvider} routeType="protected" />
        {/* <AuthRoute path="/" component={MusicPlayer} routeType="protected" /> */}
    </div>
  );
};

export default App;
