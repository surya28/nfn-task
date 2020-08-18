import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { trackService } from '../Services/tracks';
import { useHistory, useParams, Router } from 'react-router-dom';
import { toast } from 'react-toastify';

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required';
    }

    if (!values.artist) {
        errors.artist = 'Required';
    }

    if (values.minutes <= 0) {
        errors.minutes = 'Required';
    }
    if (values.seconds <= 0) {
        errors.seconds = 'Required';
    }

    return errors;
};



const TrackForm = ({ title, type, trackDetail, close, setChange }) => {
    const addFormik = useFormik({
        initialValues: {
            title: '',
            minutes: '00',
            seconds: '00',
            artist: '',
        },
        validate,
        onSubmit: values => {
            addTracks(values)
        },
    })
    const editFormik = useFormik({
        initialValues: {
            title: trackDetail ? trackDetail.title : '',
            minutes: trackDetail ? trackDetail?.length.split(":")[0] : '0',
            seconds: trackDetail ? trackDetail?.length.split(":")[1] : '0',
            artist: trackDetail ? trackDetail.artist : '',
        },
        validate,
        onSubmit: values => {
            editTracks(values)
        },
    });
    let formik;
    if (type === "add") {
        formik = addFormik;
    } else {
        formik = editFormik;
    }
    const addTracks = async (data) => {
        if (data.minutes < 10) {
            data.minutes = '0' + data.minutes
        }
        if (data.seconds < 10) {
            data.seconds = '0' + data.seconds
        }
        const payload = {
            title: data.title,
            length: `${data.minutes}:${data.seconds}`,
            artist: data.artist
        }
        try {

            const data = await trackService.createTrack(payload);

            if (data) {
                toast.success(data.message);
                close();
                setChange(prev => !prev)
            }
        } catch (err) {
            toast.error(err.message);
            close();
            setChange(prev => !prev)
        }

    }
    const editTracks = async (data) => {
        if (data.minutes < 10) {
            data.minutes = '0' + data.minutes
        }
        if (data.seconds < 10) {
            data.seconds = '0' + data.seconds
        }
        const payload = {
            title: data.title,
            length: `${data.minutes}:${data.seconds}`,
            artist: data.artist
        }
        try {
            const data = await trackService.updateTrack(trackDetail._id, payload);
            if (data) {
                toast.success(data.message);
                close();
                setChange(prev => !prev)
            }
        } catch (err) {
            toast.error("Could not update track");
            close();
            setChange(prev => !prev);
        }
    }
    return (
        <div className="new-container" >
            <form onSubmit={formik.handleSubmit} className="login-form">
                <h1 className="form-title">{title}</h1>
                <label htmlFor="title">Title
                    <input
                        placeholder="Title"
                        id="title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.title}

                    />
                </label>
                {formik.errors.title ? <div>{formik.errors.title}</div> : null}


                <label htmlFor="artist">Artist
                    <input
                        placeholder="Artist"
                        id="artist"
                        name="artist"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.artist}

                    />
                </label>
                {formik.errors.artist ? <div>{formik.errors.artist}</div> : null}


                <label htmlFor="minutes">Minutes
                    <input
                        id="minutes"
                        name="minutes"
                        type="number"
                        min={0}
                        max={59}
                        onChange={formik.handleChange}
                        value={formik.values.minutes}

                    />
                </label>
                {formik.errors.minute ? <div>{formik.errors.minute}</div> : null}

                <label htmlFor="seconds">Seconds
                    <input
                        placeholder="Seconds"
                        id="seconds"
                        name="seconds"
                        type="number"
                        max={59}
                        min={0}
                        onChange={formik.handleChange}
                        value={formik.values.seconds}

                    />
                </label>
                {formik.errors.seconds ? <div>{formik.errors.seconds}</div> : null}
                <div className="row">
                    <div className="col">
                        <button type="submit" className="button green">Submit</button>
                    </div>
                    <div className="col">
                        <button type="submit" className="button green" onClick={
                            ()=>{
                                close();
                            }
                        }>Cancel</button>
                    </div>
                </div>
            </form>
        </div >

    );
}

export default TrackForm;