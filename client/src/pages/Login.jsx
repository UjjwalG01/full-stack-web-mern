import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { dispatch } = useContext(UserContext);

    const handleLoginSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const userData = { email, password }
            const response = await axios.post(`http://127.0.0.1:4000/api/user/login`, userData);
            // context bata user ra token update garney
            console.log(response.data.data);
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: response.data.data.user,
                    access_token: response.data.data.access_token,
                }
            });
            toast.success("Login Successful!");
            navigate("/");
        } catch (e) {
            console.log(e)
            toast.error("Login Failed!");
        }
    }

    return (
        <div className="m-4 grow flex items-center justify-around ">
            <div className="mb-60 mt-20">
                <h1 className="text-4xl font-bold text-center my-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        name='email'
                        id='email'
                        placeholder="Email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)} />
                    <input
                        type="password"
                        name='password'
                        id='password'
                        placeholder="Password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)} />
                    <button type='submit' className="primary">Login</button>
                    <div className="py-4 text-center text-gray-600">
                        Don't have account?
                        <Link className="text-green-700 font-bold" to={'/register'}> Register Here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;