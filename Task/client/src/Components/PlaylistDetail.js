import React, { useEffect, useState, useContext } from 'react';
import { playlistService } from '../Services/playlist';
import { LoaderContext } from '../Provider/LoaderProvider';
import '../Styles/table.css';
import { useHistory, useParams } from 'react-router-dom';
import Header from './Header';
import { Modal } from 'react-bootstrap';
import AddTrack from '../Forms/addTrackToPlaylist';
import AddAlbum from '../Forms/addAlbumToPlaylist';
import { toast } from 'react-toastify';


const PlaylistDetail = () => {
    const history = useHistory();
    const { id } = useParams();
    const { setLoader } = useContext(LoaderContext);
    const [albumPlaylist, setAlbumPlaylists] = useState([]);
    const [playlistTracks, setTracks] = useState([]);
    const [show, setShow] = useState(false);
    const [showAlbum, setShowAlbum] = useState(false);
    const [change, setChange] = useState(false);
    const [name, setName] = useState();

    const removeTrack = async (trackID) => {
        try {
            setLoader(true);
            const result = await playlistService.removeTracks(id, trackID);
            if (result) {
                toast.success(result.message)
                setChange(prev => !prev)
                setLoader(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removeAlbum = async (albumID) => {
        try {
            setLoader(true);
            const result = await playlistService.removeAlbumFromPlaylist(id, albumID);
            if (result) {
                toast.success(result.message)
                setChange(prev => !prev)
                setLoader(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        console.log('play')
        const getData = async () => {
            try {
                setLoader(true);
                const result = await playlistService.playlistDetail(id);
                console.log(result)
                if (result) {
                    setTracks(result.data.tracks);
                    setAlbumPlaylists(result.data.albums);
                    setName(result.data.name);
                }
                setLoader(false)
            } catch (err) {
                setLoader(false)
            }

        };
        getData();
    }, [change])
    console.log(playlistTracks)
    return (
        <div className="container" >
            <Header />
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col mt-3">
                            <button className="button single-button" onClick={() => {
                                setShowAlbum(true)
                            }}>Add Album</button>
                        </div>
                    </div>
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                albumPlaylist?.length ? albumPlaylist.map((album, index) => {
                                    return (
                                        <tr key={index}>
                                            <td onClick={() => {
                                                history.push(`/playlist/albumdetail/${album._id}`)
                                            }}>{album?.name}</td>
                                            <td><i className="ml-3 far fa-trash-alt text-danger ml-2" onClick={
                                                () => {
                                                    removeAlbum(album._id)
                                                }
                                            }></i></td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col mt-3">
                            <button className="button single-button" onClick={() => {
                                setShow(true)
                            }}>Add Tracks</button>
                        </div>
                    </div>
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Artist
                                </th>
                                <th>
                                    Length
                                </th>
                                <th>
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                playlistTracks?.length ? playlistTracks.map((track, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>{track?.title}</td>
                                            <td>{track?.artist}</td>
                                            <td>{track?.length}</td>
                                            <td><i className="ml-3 far fa-trash-alt text-danger ml-2" onClick={
                                                () => {
                                                    removeTrack(track._id)
                                                }
                                            }></i></td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                show={show}
                id="#modal"
                dialogClassName=""
                size="lg">

                <AddTrack close={setShow} change={setChange} name={name} id={id} />

            </Modal>
            <Modal
                show={showAlbum}
                id="#modal1"
                dialogClassName=""
                size="lg">

                <AddAlbum close={setShowAlbum} change={setChange} name={name} id={id} />

            </Modal>
        </div>
    )
}

export default PlaylistDetail;