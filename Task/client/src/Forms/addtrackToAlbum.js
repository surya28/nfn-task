import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import { trackService } from '../Services/tracks';
import { albumService } from '../Services/album';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

let setSubmitting = true;
const MyForm = props => {
    const history = useHistory();
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await trackService.getTracks();
            if (data)
                setTracks(data.data)
        }
        getData();
    }, [])
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
            <form onSubmit={handleSubmit} className="login-form" >

                <h1 className="form-title">Albums</h1>

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
                    <select name="tracks" onChange={handleChange} placeholder="select track">
                        <option value={null}>Select track</option>
                        {
                            tracks?.length ? tracks.map(track => {
                                return (
                                    <option key={track._id} value={track._id}>{track.title}</option>
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
        name: props.details?.name || '',
        tracks: '',
        close: props?.close,
        id: props.details?._id || 0,
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
        if (values.type === "add") {
            const data = await values.save(values);
            if (data) {
                toast.success("Album added");
                values.close(false);
                values.change(prev => !prev)
            }
        } else {
            const data = await albumService.addTracksToAlbums(values.id, values.tracks)
            console.log(data)
            if (data) {
                toast.success("Track added");
                values.close(false);
                values.change(prev => !prev)
            }
        }

        setSubmitting = false;
    },
    displayName: 'BasicForm',
})(MyForm);

const AlbumForm = ({ details, close, change, save, type }) => {
    const history = useHistory();
    return (
        <MyEnhancedForm details={details} close={close} change={change} save={save} type={type} />
    )
}

export default AlbumForm;