import React, { useContext } from 'react';
import { UserContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <div className='grid grid-cols-2 m-8'>
            <div className='flex border border-gray-800 rounded-xl bg-white w-96 p-8 justify-end'>
                <div>
                    <h2 className='font-bold text-xl my-3'>Username: </h2>
                    <h2 className='font-bold text-xl my-3'>Email: </h2>
                    <h2 className='font-bold text-xl my-3'>Role: </h2>
                </div>
                <div className='ml-5'>
                    <h2 className='text-xl my-3'>{state.user?.name}</h2>
                    <h2 className='text-xl my-3'>{state.user?.email}</h2>
                    <h2 className='text-xl my-3'>{state.user?.role}</h2>
                </div>
            </div>
            <div className='justify-center border-l-4 ml-5 pl-10'>
                <h2 className='my-5 text-xl font-semibold'>User Actions</h2>
                <div className='flex gap-3'>
                    <button className='btn bg-blue-700 px-6 py-2 text-white text-lg font-bold rounded-full'>Update</button>
                    <button onClick={() => {
                        dispatch({ type: 'LOGOUT' });
                        toast.error("Logged out successfully");
                        navigate("/");
                    }} className='btn bg-red-700 px-6 py-2 text-white text-lg font-bold rounded-full'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Profile