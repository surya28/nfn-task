import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import { albumService } from '../Services/album';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { playlistService } from '../Services/playlist';

let setSubmitting = true;
const MyForm = props => {
    const history = useHistory();
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await albumService.getAlbums();
            if (data)
                setAlbums(data.data)
        }
        getData();
    }, [])
    console.log(albums)
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <div className="new-container">
            <form onSubmit={handleSubmit} className="modal-form" >

                <h1 className="form-title">Playlist</h1>

                <label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Name of the Album"
                        onChange={handleChange}
                        value={values.name}
                    />
                </label>
                <label>
                    <select name="albums" onChange={handleChange} placeholder="select album">
                        <option value={null}>Select Album</option>
                        {
                            albums?.length ? albums.map(album => {
                                return (
                                    <option key={album._id} value={album._id}>{album.name}</option>
                                )
                            }) : null
                        }
                    </select>
                </label>
                <div className="row">
                    <div className="col">
                        <button type="submit" className="button green">Add</button>
                    </div>
                    <div className="col">
                        <button type="button" className="button green">Cancel</button>
                    </div>
                </div>
            </form >
        </div>

    );
};

const MyEnhancedForm = withFormik({
    mapPropsToValues: (props) => ({
        name: props?.name || '',
        albums: '',
        close: props?.close,
        id: props?.id,
        change: props?.change,
        save: props?.save,
        type: props?.type
    }),

    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }

        return errors;
    },

    handleSubmit: async (values) => {

        const data = await playlistService.addAlbumsToPlaylist(values.id, values.albums)
        console.log(data)
        if (data) {
            toast.success("Track added");
            values.close(false);
            values.change(prev => !prev)
        }


        setSubmitting = false;
    },
    displayName: 'BasicForm',
})(MyForm);

const PlaylistForm = ({ close, change, name, id }) => {
    return (
        <MyEnhancedForm close={close} change={change} name={name} id={id} />
    )
}

export default PlaylistForm;