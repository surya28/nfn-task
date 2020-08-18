import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { albumService } from '../Services/album';
import Header from './Header';
import { Modal } from 'react-bootstrap';
import AddTrack from '../Forms/addtrackToAlbum';
import { toast } from 'react-toastify';

function AlbumDetail() {
    const { id } = useParams();
    const [albumDetails, setalbumDetails] = useState({});
    const [show, setShow] = useState(false);
    const [change, setChange] = useState(false)

    const removeTrack = async (trackId, albumId) => {
        try {
            const data = await albumService.removeTracks(albumId, trackId)
            if (data) {
                toast.success(data.message)
                setChange(prev => !prev)
            }
        } catch (err) {

        }
        console.log(trackId, albumId)
    }
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
                            <button variant="success" className="button single-button" onClick={() => {
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
                                albumDetails.tracks?.length ? albumDetails.tracks.map((track, index) => {
                                    return (

                                        <tr key={track._id}>
                                            <td>{track?.title}</td>
                                            <td>{track?.artist}</td>
                                            <td>{track?.length}</td>
                                            <td><i className="ml-3 far fa-trash-alt text-danger ml-2" onClick={
                                                () => {
                                                    removeTrack(track._id, albumDetails._id)
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
                // onHide={}
                dialogClassName="login-form"
                size="lg">

                <AddTrack details={albumDetails} close={setShow} change={setChange}/>

            </Modal>
        </div>
    )
}

export default AlbumDetail
