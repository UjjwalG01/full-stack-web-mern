import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Carousel from '../components/Carousel';
import { Badge } from '@mui/material'
import { toast } from 'react-toastify';
// import dotenv from 'dotenv';
// dotenv.config();

function Home() {
    const [places, setPlaces] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [booked, setBooked] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const fetchPlaces = async () => {
        const search = searchParams.get('q') ? `?q=${searchParams.get('q')}` : '';
        try {
            const response = await axios.get(`http://localhost:4000/api/place${search}`);
            // const response = await axios.get(`${process.env.SERVER_URL}/place${search}`);
            const { data } = await response.data;
            setPlaces(data);
            // console.log(data);
        } catch (err) {
            toast.error(err.message);
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchPlaces();
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/?q=${searchText}`)
    }

    return (
        <div className=''>
            <section className="h-50 pt-3">
                <div className="px-10 mx-auto">
                    <form role='search' className='flex mt-2' onSubmit={handleSearch}>
                        <input onChange={(e) => setSearchText(e.target.value)} className="w-1/2 mx-auto h-12 px-3 rounded-3xl mb-4 border-primary border-2 text-xl shadow-lg" type="search" placeholder="Search..." />
                    </form>
                    <nav className="flex justify-center overflow-x-hidden ">
                        <Link className="no-underline text-white bg-slate-400 rounded-full py-2 px-4 font-medium mr-4" href="/">Single Room</Link>
                        <Link className="no-underline text-white bg-slate-400 rounded-full py-2 px-4 font-medium mr-4" href="/">Single Apartment</Link>
                        <Link className="no-underline text-white bg-slate-400 rounded-full py-2 px-4 font-medium mr-4" href="/">Double Bed Single Room</Link>
                        <Link className="no-underline text-white bg-slate-400 rounded-full py-2 px-4 font-medium mr-4" href="/">Family Stay Room</Link>
                        <Link className="no-underline text-white bg-slate-400 rounded-full py-2 px-4 font-medium mr-4" href="/">Dual Room</Link>
                        <Link className="no-underline text-white bg-slate-400 rounded-full py-2 px-4 font-medium mr-4" href="/">Rooms below $20</Link>
                        <Link className="no-underline text-white bg-slate-400 rounded-full py-2 px-4 font-medium mr-4" href="/">Rooms below $20</Link>
                        <Link className="no-underline text-white bg-slate-400 rounded-full py-2 px-4 font-medium mr-4" href="/">Rooms in Kathmandu</Link>
                        <Link className="no-underline text-white bg-slate-400 rounded-full py-2 px-4 font-medium mr-4" href="/">3 BHK Apartment</Link>
                    </nav>
                </div>

                {places.length > 0 ?
                    <div className="px-6 pb-8 mx-5">
                        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                            {places.length > 0 ? places
                                .filter((item => {
                                    return searchText.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchText) || item.address.toLowerCase().includes(searchText)
                                }))
                                .map(place => (
                                    <Badge className='cursor-pointer' key={place._id} color="secondary" badgeContent={place.booked === true ? "Booked" : null}>
                                        <Link to={`/account/place/${place._id}`} key={place._id} className="w-full ">
                                            <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600 flex">
                                                {place.photo?.[0] && (
                                                    <img className='rounded-lg w-full object-cover' src={'http://localhost:4000/' + place.photo?.[0]} alt="No Image Available!" />
                                                )}
                                            </div>

                                            <p className="w-full h-2 mt-4 text-gray-500 text-sm rounded-lg">{place.address}</p>
                                            <h1 className="w-full h-6 mt-4 text-lg font-bold truncate">{place.title}</h1>
                                            <h2 className="w-full h-2 mt-2 text-lg"><span className='font-bold'>${place.price}</span> per night</h2>
                                        </Link>
                                    </Badge>
                                )) : (<div>
                                    <h2 className='text-4xl text-center my-80 font-bold'>No Places Available!</h2>
                                </div>)}
                        </div>
                        <div className='text-center text-4xl font-bold my-6'>Explore Exciting Places!</div>
                        <div className='w-full text-center'>
                            <Carousel places={places} />
                        </div>
                    </div>
                    : (<h2 className='text-4xl text-center my-80 font-bold'>Oops! Server is not responding.</h2>)}
            </section>

        </div>
    )
}

export default Home