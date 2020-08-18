import React from 'react';
import Login from './Pages/Login';
import Register from './Pages/Register';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Router/PrivateRouter';
import LoaderProvider from './Provider/LoaderProvider';
import Tracks from './Pages/Tracks';
import Album from './Pages/Album';
import AlbumDetail from './Components/AlbumDetail';
import Playlist from './Pages/Playlist';
import PlaylistDetail from './Components/PlaylistDetail';
import PlaylistAlbumTrack from './Components/PlaylistAlbumTracks';

toast.configure();
function App() {
  return (
    <Router>
      <Switch>
        <LoaderProvider>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/register"><Register /></Route>
          <PrivateRoute exact path="/tracks"><Tracks /></PrivateRoute>
          <PrivateRoute exact path="/albums"><Album /></PrivateRoute>
          <PrivateRoute exact path="/albumdetail/:id"><AlbumDetail /></PrivateRoute>
          <PrivateRoute exact path="/playlists"><Playlist /></PrivateRoute>
          <PrivateRoute exact path="/playlist/:id"><PlaylistDetail /> </PrivateRoute>
          <PrivateRoute exact path="/playlist/albumdetail/:id"><PlaylistAlbumTrack /> </PrivateRoute>
        </LoaderProvider>
      </Switch>
    </Router>
  );
}

export default App;
