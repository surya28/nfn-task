import React, { useEffect, useState, useContext } from 'react';
import { albumService } from '../Services/album';
import { LoaderContext } from '../Provider/LoaderProvider';
import { Modal } from 'react-bootstrap';
import '../Styles/table.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddTrack from '../Forms/addtrackToAlbum';


const Albums = () => {
    const history = useHistory();
    const { setLoader } = useContext(LoaderContext);
    const [albums, setAlbums] = useState();
    const [show, setShow] = useState(false);
    const [change, setChange] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setLoader(true);
                const result = await albumService.getAlbums();
                if (result) {
                    console.log(result.data)
                    setAlbums(result.data);
                }
                setLoader(false)
            } catch (err) {
                setLoader(false)
            }

        };

        getData();
    }, [change])

    const deleteAlbum = async (id) => {
        try {
            const data = await albumService.deleteAlbum(id);
            if (data) {
                toast.success("Album deleted");
                setChange(prev => !prev)
            }
        } catch (err) {
            toast.warning("could not delete album")
        }
    }

    return (
        <div className="container" >
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col mt-3">
                            <button variant="success" className="button single-button" onClick={() => {
                                setShow(true)
                            }}>Add Albums</button>
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
                                albums?.length ? albums.map((album, index) => {
                                    return (
                                        <tr key={album._id} >
                                            <td onClick={() => {
                                                history.push(`/albumDetail/${album._id}`)
                                            }}>{album?.name}</td>
                                            <td><i className="ml-3 far fa-trash-alt text-danger ml-2" onClick={() => {
                                                deleteAlbum(album._id)
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
                // onHide={}
                dialogClassName="login-form"
                size="lg">

                <AddTrack close={setShow} change={setChange} save={albumService.createAlbum} type="add"/>

            </Modal>
        </div >
    )
}

export default Albums;