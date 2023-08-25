import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const registerUser = async (ev) => {
        try {
            ev.preventDefault();
            if (!name || !email || !password) {
                toast.error('All fields are required');
                return;
            }
            if (password.length < 8) {
                toast.error('Password must be at least 8 characters');
                return;
            }
            const newUser = { name, email, password };
            const response = await axios.post(`http://127.0.0.1:4000/api/user/register`, newUser);
            console.log(response.data)
            toast.success("User registered successfully!")
            navigate("/login")
        } catch (e) {
            toast.error(e.response?.data?.message ?? e.message)
            console.log(e)
        }
    }

    return (
        <div className="m-4 grow flex items-center justify-around">
            <div className="mb-60 mt-10">
                <h1 className="text-4xl text-center my-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)} />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)} />
                    <button className="primary">Submit</button>
                    <div className="py-4 text-center text-gray-600">
                        Already have an account?
                        <Link className="text-green-700 font-bold" to={'/login'}> Login Here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

