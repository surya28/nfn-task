import React from 'react';
import { useFormik } from 'formik';
import { authService } from '../Services/auth';
import { useHistory } from 'react-router-dom';
import '../Styles/form.css';


let setSubmitting = false;

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
        setSubmitting = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    if (!values.name) {
        errors.name = 'Required';
    }

    if (errors.email || errors.password || errors.name) {
        setSubmitting = false
    } else {
        setSubmitting = true
    }

    return errors;
};


const Login = () => {
    const history = useHistory();
    async function getUserData(values) {
        try {
            const response = await authService.register(values.name, values.email, values.password);
            console.log(response);
            history.push('/')
        } catch (err) {

        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: ''
        },
        validate,
        onSubmit: values => {
            if (setSubmitting) {
                getUserData(values)
            }
        },
    });
    return (
        <div className="new-container">
            <form onSubmit={formik.handleSubmit} className="login-form" >

                <h1 className="form-title">Register</h1>

                <label>
                    <input
                        name="name"
                        type="name"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </label>
                <label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </label>
                <button type="submit" className="button green"><i class="fas fa-user-lock"></i> Sign Up</button>
            </form >
        </div>

    );
};

export default Login;