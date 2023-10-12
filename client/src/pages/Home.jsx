import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Carousel from '../components/Carousel';
import { Badge } from '@mui/material'
import { toast } from 'react-toastify';
import Error from '../components/Error';
// import dotenv from 'dotenv';
// dotenv.config();

function Home() {
    const [links, setLinks] = useState([
        {
            label: 'All Places',
            onClick: () => {
                setSearchText('')
            }
        },
        {
            label: 'Single Room',
            onClick: () => {
                setSearchText('single')
            }
        },
        {
            label: 'Double Bed Single Room',
            onClick: () => {
                setSearchText('double')
            }
        },
        {
            label: 'Family Stay Room',
            onClick: () => {
                setSearchText('apartment')
            }
        },
        {
            label: 'Dual Room',
            onClick: () => {
                setSearchText('two')
            }
        },
        {
            label: 'Nepali Style',
            onClick: () => {
                setSearchText('nepali-style')
            }
        },
        {
            label: 'Rooms near Kathmandu',
            onClick: () => {
                setSearchText('kathmandu')
            }
        },
        {
            label: 'Rooms near Pokhara',
            onClick: () => {
                setSearchText('pokhara')
            }
        },
        {
            label: '3 BHK Apartment',
            onClick: () => {
                setSearchText('3 bhk')
            }
        },
        {
            label: 'Peaceful Environment',
            onClick: () => {
                setSearchText('peaceful')
            }
        },
    ]);
    const [places, setPlaces] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const fetchPlaces = async () => {
        const search = searchParams.get('q') ? `?q=${searchParams.get('q')}` : '';
        try {
            const response = await axios.get(`https://bookstore-backend-bice.vercel.app/api/place${search}`);
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
                {/* {places.length < 0 && */}
                <div className="px-10 mx-auto">
                    <form role='search' className='flex mt-2' onSubmit={handleSearch}>
                        <input onChange={(e) => setSearchText(e.target.value)} className="w-1/2 mx-auto h-12 px-3 rounded-3xl mb-4 border-primary border-2 text-xl shadow-lg" type="search" placeholder="Search..." />
                    </form>
                    <nav className="flex justify-center overflow-x-hidden ">
                        {
                            links.map(link => (
                                <Link onClick={link.onClick} className={"no-underline text-white rounded-full py-2 pb-1 px-4 font-bold mr-4 bg-slate-400"} to={'/'}>{link.label}</Link>
                            ))
                        }
                    </nav>
                </div>
                {/* } */}

                {places.length > 0 ?
                    <div className="px-6 pb-8 mx-5">
                        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                            {places.length > 0 ? places
                                .filter((item => {
                                    return searchText.toLowerCase() === '' ? item : (item.title.toLowerCase().includes(searchText) || item.address.toLowerCase().includes(searchText)) || item.description.toLowerCase().includes(searchText);
                                }))
                                .map(place => (
                                    <Badge className='cursor-pointer' key={place._id} color="secondary" badgeContent={place.booked === true ? "Booked" : null}>
                                        <Link to={`/account/place/${place._id}`} key={place._id} className="w-full ">
                                            <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600 flex">
                                                {place.photo?.[0] && (
                                                    <img className='rounded-lg w-full object-cover' src={'https://bookstore-backend-bice.vercel.app/' + place.photo?.[0]} alt="No Image Available!" />
                                                )}
                                            </div>

                                            <p className="w-full h-2 mt-4 text-gray-500 text-sm rounded-lg">{place.address}</p>
                                            <h1 className="w-full h-6 mt-4 text-lg font-bold truncate">{place.title}</h1>
                                            <div className="flex w-full h-2 mt-2 text-lg">
                                                <h2 className='font-bold'>${place.price} per night</h2>
                                                <h2 className='flex content-center gap-2 px-2 bg-orange-600 h-6 py-1 mx-2 rounded-md text-white'>
                                                    {place.category === 'premium' ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                        </svg>
                                                    }
                                                    <h2 className='uppercase font-bold text-xs'>{place.category}</h2>
                                                </h2>
                                            </div>
                                        </Link>
                                    </Badge>
                                )) : (<div>
                                    <h2 className='text-4xl text-center my-80 font-bold'>No Places Available!</h2>
                                </div>)}
                        </div>
                        <div className='text-center text-5xl font-serif font-bold pb-4 border-b-4 my-8 py-8'>Explore Exciting Places!</div>
                        <div className='w-full text-center'>
                            <Carousel places={places} />
                        </div>
                    </div>
                    // : (<h2 className='text-4xl text-center my-80 font-bold'>Oops! Server is not responding.</h2>)}
                    : (<Error />)}
            </section>

        </div>
    )
}

export default Home