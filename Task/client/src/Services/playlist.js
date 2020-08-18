import API from './config';
import { albumService } from './album';

const getplaylists = () => {
    return API({
        method: 'GET',
        url: '/playlist',
    }, true);
};

const createPlaylist = (data) => {
    console.log(data)
    let tracks = [], albums = [];
    tracks.push(data.tracks);
    albums.push(data.tracks);
    const payload = {
        name: data.name,
        trackID: tracks,
        albumID: albums
    }
    return API({
        method: 'POST',
        url: `/playlist/add`,
        data: payload
    }, true);
}

const playlistDetail = (id) => {
    return API({
        method: 'GET',
        url: `/playlist/${id}`,
    }, true);
}

const addTracksToPlaylist = (id, data) => {
    let tracks = [];
    tracks.push(data);
    const payload = {
        trackID: tracks
    }
    return API({
        method: 'PATCH',
        url: `playlist/addtracks/${id}`,
        data: payload
    })
}

const addAlbumsToPlaylist = (id, data) => {
    console.log(data)
    let tracks = [];
    tracks.push(data);
    const payload = {
        albumID: tracks
    }
    return API({
        method: 'PATCH',
        url: `playlist/addalbums/${id}`,
        data: payload
    })
}

const removeTracks = (id, trackID) => {
    console.log(id, trackID)
    return API({
        method: 'PATCH',
        url: `/playlist/removetrack/${id}`,
        data: {
            trackID: trackID
        }
    }, true)
}

const removePlaylist = (id) => {
    return API({
        method: 'DELETE',
        url: `/playlist/delete`,
        data: {
            playlistID: id
        }
    }, true)
}

const removeAlbumFromPlaylist = (id, albumID)=>{
    return API({
        method: 'PATCH',
        url: `/playlist/removealbum/${id}`,
        data: {
            albumID
        }
    }, true)
}


export const playlistService = { getplaylists, playlistDetail, removePlaylist, addTracksToPlaylist, removeTracks, addAlbumsToPlaylist, createPlaylist, removeAlbumFromPlaylist };