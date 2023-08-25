import React, { useContext, useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import axios from 'axios'
import { UserContext } from '../context/AuthProvider';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';

function BookingsPage() {
    const { state } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/place/bookings/' + state.user._id).then((response) => {
            const { data } = response.data;
            setBookings(data);
            // console.log(data)
        });
    }, [state.user._id]);
    return (
        <div>
            <AccountNav />
            <div className='mx-6 my-4'>
                {bookings.length > 0 ? bookings.map((booking) => (
                    <Link to={`/account/bookings/${booking._id}`} key={booking._id} className='flex gap-4 mb-6 bg-gray-200 rounded-2xl overflow-hidden'>
                        <div className='w-48'>
                            <img className='w-full h-full object-cover' src={'http://localhost:4000' + booking.place.photo[0]} alt="" />
                        </div>
                        <div className='py-3 grow pr-3'>
                            <h2 className='text-xl'>{booking.place.title}</h2>
                            <h2 className='text-sm text-gray-500 italic'>{booking.place.address}</h2>
                            <div className='flex gap-2 mt-2 py-2 border-t text-sm border-gray-300 font-semibold'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                                {booking.checkIn}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>
                                {booking.checkOut}
                            </div>
                            <div className='flex gap-2 font-semibold'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>
                                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn)) === 1 ? (<p>night</p>) : (<p>nights</p>)} |
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Total Price: ${booking.price}
                            </div>
                        </div>
                    </Link>
                )) : (
                    <div>
                        <h2 className='font-bold text-3xl text-center my-60'>You have no bookings yet!</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookingsPage