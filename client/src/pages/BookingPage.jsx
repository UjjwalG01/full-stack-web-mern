import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/AuthProvider';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import { differenceInCalendarDays, differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';

function BookingPage() {
    const { state } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [show, setShow] = useState(false);
    const [modal, setModal] = useState({
        title: "",
        message: "",
        isLoading: false,
    });
    const [bookingId, setBookingId] = useState(null);
    const [confirm, setConfirm] = useState(null);

    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('http://localhost:4000/api/place/bookings/' + state.user._id).then((response) => {
                const foundBooking = response.data.data.find(({ _id }) => _id === id);
                setBooking(foundBooking);
            });
        }
    }, []);
    // controlled function call only when user confirms
    useEffect(() => {
        if (confirm) {
            handleDelete(bookingId, "Booking deleted successfully")
        }
    }, [confirm])

    if (!booking) {
        return <h2 className='text-center text-xl font-semibold'>Loading...</h2>;
    }

    const handleModal = (id, title, message) => {
        if (id) {
            setModal({
                ...modal,
                title,
                message,
                isLoading: true
            });
            setBookingId(id);
        }
    }
    const handleDelete = async (id, message) => {
        try {
            // deleting the bookings
            await axios.delete(`http://localhost:4000/api/place/bookings/${id}`);

            // setting the booking to false: i.e open for booking
            await axios.get(`http://localhost:4000/api/place/non-booked/${id}`);

            toast.error(message)
            navigate("/account/bookings")
        } catch (err) {
            toast.error(err.message);
            navigate("/account/bookings")
        }
    };

    return (
        <div className='my-8 mx-4'>
            <h1 className='text-2xl'>{booking.place.title}</h1>
            {modal.isLoading && (<Modal modal={modal} setModal={setModal} setConfirm={setConfirm} />)}
            <div className='mx-2'>
                <AddressLink place={booking.place} />
                <div className='bg-gray-200 p-4 mb-4 rounded-2xl' >
                    <h2 className='text-xl font-semibold'>Your booking information</h2>
                    <div className='flex justify-between items-center'>
                        <div>
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
                                Total duration: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn)) === 1 ? (<p>night</p>) : (<p>nights</p>)}
                            </div>
                        </div>
                        <div className='mx-4 text-white bg-primary p-4 rounded-2xl'>
                            <h3 className='font-semibold text-xl'>Total Price</h3>
                            <h2 className='flex justify-center text-4xl font-semibold'>${booking.price}</h2>
                        </div>
                    </div>
                </div>
                <PlaceGallery place={booking.place} />
                <div className='my-4'>
                    <h2 className='font-semibold text-2xl'>Description</h2>
                    {booking.place.description}
                </div>
                <div className="bg-white -mx-4 p-4 rounded-xl border-t">
                    <h2 className='font-semibold text-2xl my-2'>Extra Info:</h2>
                    <div className='text-sm text-gray-700 leading-5'>
                        {booking.place.extraInfo}
                    </div>
                </div>
                <div className='flex justify-between items-center my-6 p-4 bg-gray-300 rounded-lg overflow-hidden'>
                    <div>
                        <button onClick={() => setShow(true)} className='bg-red-500 text-white px-3 py-2 my-3 rounded-lg font-semibold'>Check Status</button>
                        <div>{differenceInDays(new Date(booking.checkOut), new Date()) >= 0 ? (
                            <div>
                                {show === true && (
                                    <h2 className='text-xl font-semibold my-4'>Your booking expires in {(differenceInDays(new Date(booking.checkOut), new Date()) + 1)} {differenceInDays(new Date(booking.checkOut), new Date()) < 1 ? 'day' : 'days'}.</h2>
                                )}
                            </div>
                        ) : (
                            <div>
                                {show === true && (
                                    <h2 className='text-xl font-semibold my-4'>Your booking has expired.</h2>
                                )}
                            </div>
                        )}</div>
                    </div>
                    <div>Make a Payment</div>
                </div>
                <div className='flex justify-end items-center bg-gray-400 rounded-lg overflow-hidden'>
                    <div>
                        <h2 className='text-2xl font-semibold mr-4'>Cancel your Booking</h2>
                        <h2 className='text-xs italic text-gray-600 font-semibold mr-4 text-right'>**Extra charges for cancellation!</h2>
                    </div>
                    {/* <button onClick={() => handleDelete(booking.place._id, "You cancelled the booking!")} className='w-36 h-28 bg-red-500 flex justify-center items-center'> */}
                    <button onClick={() => handleModal(booking.place._id, "Cancel your booking", "Are you sure to cancel the booking!")} className='w-36 h-28 bg-red-500 flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7 mx-auto my-3 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingPage