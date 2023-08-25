import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import { UserContext } from '../context/AuthProvider'


function Accomodations() {
    const [places, setPlaces] = useState([]);
    const { state } = useContext(UserContext);
    const userId = state?.user?._id;

    const getPlaces = async () => {
        if (userId) {
            const response = await axios.get(`http://localhost:4000/api/place/user-place/${userId}`)
            setPlaces(response.data.data);
            // console.log(response.data.data);
        }
    }
    useEffect(() => {
        getPlaces();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/place/${id}`);
            toast.success("Successfully deleted");
            getPlaces();
        } catch (e) {
            toast.error(e.message);
        }
    };
    return (
        <>
            <div className='text-center'>
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full' to={'/account/accomodations/new'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className='mt-5'>
                {places.length > 0 && places.map(place => (
                    <div key={place._id} className='flex gap-4 bg-gray-100 p-4 rounded-2xl'>
                        <Link to={`/account/accomodations/${place._id}`} className='flex cursor-pointer w-32 h-32 bg-gray-200 shrink-0'>
                            {place.photo.length > 0 && (
                                <img className='object-cover' src={'http://127.0.0.1:4000' + place.photo?.[0]} alt="" />
                            )}
                        </Link>
                        <div className='flex items-center'>
                            <div className='w-11/12 border-r pr-3'>
                                <h2 className='text-xl flex gap-4'>
                                    {place.title}
                                    {place.booked === true ? <Chip label="Booked" className='font-bold mx-2' icon={<DoneIcon />} color='success' /> : null}
                                </h2>
                                <p className='text-sm mt-2 text-justify'>{place.description}</p>
                            </div>
                            <button onClick={() => handleDelete(place._id)} className='w-1/12 bg-red-600 h-14 ml-4 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 mx-auto my-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Accomodations