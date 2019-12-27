import React from 'react';
// import gql from "graphql-tag";
// import { Query } from "react-apollo";
import { Switch} from "react-router-dom";
import Login from "./auth/Login";
import GenreIndex from "./genres/GenreIndex";
import AuthRoute from "../util/route_util";
import Nav from "./navigation/Nav";
import Register from "./auth/Register";
import SideBar from './navigation/SideBar';
// import MusicPlayer from "./player/MusicPlayer";
import Search from './navigation/Search';
import Account from './navigation/Account';
import SplashPage from "./Splash";
import PlaylistIndex from "./playlists/playlist_index";
// import PlayerProvider from "./player/PlayerProvider";
import MusicPlayer from "./player/MusicPlayer";
import Modal from "./modal/Modal";
import GenreShow from "./genres/GenreShow";
import ArtistShow from './Artist_Show';
import PlaylistShow from "./playlists/playlist_show";

const App = () => {
  return (
    <div className='full-app'>
      <div className='app-content'>
        <AuthRoute path='/' component={SideBar} routeType='protected' />
        <AuthRoute path='/' component={Nav} routeType='protected' />
        <Switch>
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
          <AuthRoute exact path='/search' component={Search} routeType='protected' />
          <AuthRoute exact path='/account' component={Account} routeType='protected' />
          <AuthRoute exact path="/library/playlists/" component={PlaylistIndex} routeType="protected"/>       
          <AuthRoute exact path="/" component={GenreIndex} routeType="protected"/>
          <AuthRoute exact path="/genres/:genreId" component={GenreShow} routeType="protected" />
          <AuthRoute exact path='/artists/:artistId' component={ArtistShow} routeType='protected' />
          <AuthRoute exact path="/playlists/:playlistId" component={PlaylistShow} />
        </Switch>        
        <Modal/>
      </div>
      {/* <AuthRoute path="/" component={PlayerProvider} routeType="protected" /> */}
      <AuthRoute path="/" component={MusicPlayer} routeType="protected" />
    </div>
  );
};

export default App;
