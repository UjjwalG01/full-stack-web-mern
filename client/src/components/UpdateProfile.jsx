import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

function UpdateProfile({ showDialog, setShowDialog }) {
    const { state, dispatch } = useContext(UserContext);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        fetchUser(state.user._id);
    }, []);

    const fetchUser = async (id) => {
        const response = await axios.get(`http://localhost:4000/api/user/profile/${id}`);
        const user = response?.data;
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        const updatedUser = { name, email };
        const response = await axios.put(`http://localhost:4000/api/user/update`, updatedUser);
        dispatch({
            type: 'UPDATE',
            payload: {
                user: response.data.data,
            }
        });
        setShowDialog(false);
        toast.success("Profile updated successfully")
    }

    return (
        <div className='fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity duration-300'>
            <div className='bg-white w-[600px] text-center h-[370px] mt-[250px] rounded-lg justify-center p-8 mx-auto'>
                <h1 className='text-2xl font-semibold my-4'>Update Profile</h1>
                <form className="max-w-md mx-auto" onSubmit={updateProfile}>
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
                        placeholder="New Password"
                        value={password}
                        disabled
                        onChange={(ev) => setPassword(ev.target.value)} />
                    <input
                        type="text"
                        placeholder="Role"
                        value={role}
                        disabled={true}
                        onChange={(ev) => setRole(ev.target.value)} />
                    <div className='flex gap-6 mt-2'>
                        <button onClick={() => setShowDialog(false)} className="secondary w-1/2 cursor-pointer">Cancel</button>
                        <button type='submit' className="primary w-1/2 cursor-pointer">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile