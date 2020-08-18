import React, { useEffect, useState, useContext } from 'react';
import { trackService } from '../Services/tracks';
import { LoaderContext } from '../Provider/LoaderProvider';
import { Modal } from 'react-bootstrap';
import '../Styles/table.css';
import { useHistory } from 'react-router-dom';
import TrackForm from '../Forms/trackForm';
import { toast } from 'react-toastify';


const Tracks = () => {
    const { setLoader } = useContext(LoaderContext);
    const [tracks, setTracks] = useState({});
    const [trackDetail, setDetail] = useState({});
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [change, setChange] = useState(false);

    const removeTrack = async (id) => {
        try {
            setLoader(true);
            const result = await trackService.removeTrack(id);
            if (result) {
                toast.success(result.message)
                setChange(prev => !prev)
                setLoader(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditClose = () => {
        setShowEdit(false);
    }
    const handleEditShow = async (id) => {
        try {
            setLoader(true);
            const result = await trackService.getTrackDetail(id);
            if (result) {
                setDetail(result.data);
                setLoader(false)
                setShowEdit(true);
            }
        } catch (err) {
            setLoader(false)
        }
    }

    const handleAddClose = () => {
        setShowAdd(false);
    }
    const handleAddShow = async () => {
        setShowAdd(true);
    }

    useEffect(() => {
        const getData = async () => {
            console.log('loading')
            try {
                setLoader(true);
                const result = await trackService.getTracks();
                if (result)
                    setTracks(result.data);
                setLoader(false)
            } catch (err) {
                setLoader(false)
            }

        };
        getData();
    }, [change])

    return (
        <div className="container mt-3" >
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col mt-3">
                            <button variant="success" className="button single-button" onClick={() => handleAddShow()}>Add Tracks</button>
                        </div>
                    </div>
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>
                                    Title
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
                                tracks?.length ? tracks.map((track, index) => {
                                    return (

                                        <tr key={track._id} >
                                            <td>{track?.title}</td>
                                            <td>{track?.artist}</td>
                                            <td>{track?.length}</td>
                                            <td><i className="far fa-edit text-success" onClick={() => handleEditShow(track._id)}></i><i className="ml-3 far fa-trash-alt text-danger ml-2" onClick={
                                                () => removeTrack(track._id)
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
                show={showEdit}
                onHide={() => handleEditClose()}
                dialogClassName="login-form"
                size="lg">

                <TrackForm type="edit" close={handleEditClose} trackDetail={trackDetail} title="Edit Track" setChange={setChange} />

            </Modal>

            <Modal
                show={showAdd}
                onHide={() => handleAddClose()}
                dialogClassName="login-form"
                size="lg">

                <TrackForm type="add" close={handleAddClose} title="Add Track" setChange={setChange} />

            </Modal>
        </div>
    )
}

export default Tracks;