import React, { useEffect, useState, useContext } from 'react';
import { playlistService } from '../Services/playlist';
import { LoaderContext } from '../Provider/LoaderProvider';
import '../Styles/table.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import PlaylistForm from '../Forms/playlistForm';

const PlaylistTable = () => {
    const history = useHistory();
    const { setLoader } = useContext(LoaderContext);
    const [playlists, setPlaylists] = useState();
    const [change, setChange] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        console.log('play')
        const getData = async () => {
            try {
                setLoader(true);
                const result = await playlistService.getplaylists();
                if (result)
                    setPlaylists(result.data);
                setLoader(false)
            } catch (err) {
                setLoader(false)
            }

        };
        getData();
    }, [change])

    const deletePlaylist = async (id) => {
        try {
            const data = await playlistService.removePlaylist(id);
            if (data) {
                toast.success("Playlist deleted");
                setChange(prev => !prev)
            }
        } catch (err) {
            toast.warning("could not delete Playlist")
        }
    }

    return (
        <div className="container" >
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col mt-3">
                            <button className="button single-button" onClick={()=>{
                                setShow(true)
                            }}>Add Playlists</button>
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
                                playlists?.length ? playlists.map((playlist, index) => {
                                    return (

                                        <tr key={playlist._id} >
                                            <td onClick={() => {
                                                history.push(`/playlist/${playlist._id}`)
                                            }}>{playlist?.name}</td>
                                            <td><i className="ml-3 far fa-trash-alt text-danger ml-2" onClick={() => {
                                                deletePlaylist(playlist._id)
                                            }}></i></td>
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

                <PlaylistForm close={setShow} change={setChange} />

            </Modal>
        </div>
    )
}

export default PlaylistTable;