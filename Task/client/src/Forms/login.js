import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { authService } from '../Services/auth';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Styles/form.css';
import { LoaderContext } from '../Provider/LoaderProvider';


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

    if (errors.email || errors.password) {
        setSubmitting = false
    } else {
        setSubmitting = true
    }

    return errors;
};


const Login = () => {
    const history = useHistory();
    const { setLoader } = useContext(LoaderContext);
    async function getUserData(values) {
        try {
            setLoader(true);
            const response = await authService.login(values.email, values.password);
            setLoader(false);
            if (response.status === 400) {
                toast.error(response)
            } else {
                setLoader(true);
                toast.success(response.message)
                localStorage.setItem('token', response?.['auth-token']);
                setLoader(false);
                history.push('/tracks')
            }
        } catch (err) {
            toast.error(err)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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

                <h1 className="form-title">Log In</h1>

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
                <p className="p" onClick={() => {
                    history.push('/register')
                }}>New user? Click here to register</p>
                <button type="submit" className="button green"><i class="fas fa-user-lock"></i> Login</button>
            </form >
        </div>

    );
};

export default Login;