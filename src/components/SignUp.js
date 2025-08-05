import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const host = "http://localhost:5000";


    const onChange = (e) => {
        const { name, value } = e.target;

        setCredentials({ ...credentials, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' }); // Clear error for the field being
        }
    }
    const handelSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const { name, email, password } = credentials;
        const response = await fetch(`${host}/api/v1/auth/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        if (data.error) {
            setErrors({ ...errors, email: data.error });
            return;
        }

        localStorage.setItem('token', data.authToken);
        navigate('/'); // Redirect to home page after successful login

    }

    const validate = () => {
        const newErrors = {};
        if (credentials.email.trim() === '') {
            newErrors.email = 'Email is required.';
        }
        if (credentials.password.trim() === '') {
            newErrors.password = 'Password is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4">Create new account</h3>

                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="name"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={onChange}
                            placeholder="Enter your names"
                            required
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={onChange}
                            placeholder="name@example.com"
                            required
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}

                    </div>

                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type='password'
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={onChange}
                                placeholder="Enter your password"
                                required
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}

                        </div>
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="cpassword" className="form-label">Confirm c</label>
                        <div className="input-group">
                            <input
                                type='text'
                                className="form-control"
                                id="cpassword"
                                name="cpassword"
                                onChange={onChange}
                                placeholder="Confirm your password"
                                required
                            />
                            {errors.cpassword && <div className="text-danger">{errors.cpassword}</div>}

                        </div>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">
                            SignUp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp