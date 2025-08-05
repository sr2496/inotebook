import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const host = "http://localhost:5000";

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const onchange = (e) => {
        const { name, value } = e.target;

        setCredentials({ ...credentials, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' }); // Clear error for the field being
        }
    }
    const handelSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        console.log(credentials);

        const response = await fetch(`${host}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
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
                <h3 className="text-center mb-4">Login to your account</h3>

                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            onChange={onchange}
                        />
                        {errors.email && <div className="text-danger text-sm">{errors.email}</div>}
                    </div>

                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                name="password"
                                id="password"
                                onChange={onchange}
                                placeholder="Enter your password"
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={togglePasswordVisibility}
                            >
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>

                        </div>
                        {errors.password && <div className="text-danger text-sm">{errors.password}</div>}

                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <a href="#" className="small">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
