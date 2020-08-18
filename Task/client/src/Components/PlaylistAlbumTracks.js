import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { albumService } from '../Services/album';
import Header from './Header';
import { Modal } from 'react-bootstrap';
import AddTrack from '../Forms/addtrackToAlbum';
import { toast } from 'react-toastify';

function PlaylistAlbumTrack() {
    const { id } = useParams();
    const [albumDetails, setalbumDetails] = useState({});
    const [show, setShow] = useState(false);
    const [change, setChange] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const data = await albumService.albumDetail(id)
            if (data)
                setalbumDetails(data.data)
        }
        getData();
    }, [change])
    return (
        <div className="container" >
            <Header />
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col mt-3">

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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    albumDetails.tracks?.length ? albumDetails.tracks.map((track, index) => {
                                        return (

                                            <tr key={track._id}>
                                                <td>{track?.title}</td>
                                                <td>{track?.artist}</td>
                                                <td>{track?.length}</td>
                                            </tr>
                                        )
                                    }) : null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistAlbumTrack;
