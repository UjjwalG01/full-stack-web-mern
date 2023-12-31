import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';


function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const { state } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setName(state.user?.name)
        // console.log(state.user?._id)
        // console.log(place.owner)
    }, [state.user])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    const bookThisPlace = async () => {
        try {
            if (!state.user?.name) {
                navigate('/login');
                return new Error("User is not logged in!");
            }
            if (!checkIn || !checkOut || !name || !numberOfGuests) {
                toast.info("Please enter your details");
                return;
            }
            if (!phone || phone.length > 13 || phone.length < 10) {
                toast.warn("Please enter valid phone number");
                return;
            }
            if ((phone.startsWith(98) || phone.startsWith(97)) === false) {
                toast.warn("Starts with 98 or 97");
            }

            if (state.user?._id === place.owner) {
                toast.info(`Hey!👋 You own this place!`)
                navigate(`/account/place/${place._id}`);
                return;
            }

            const bookedPlace = await axios.get(`https://bookstore-backend-bice.vercel.app/api/place/booked/${place._id}/check`);
            const { booked } = await bookedPlace.data.data;
            if (booked === true) {
                toast.info(`Sorry, place is already booked!`);
                navigate(`/account/place/${place._id}`);
                return;
            } else {
                // sending the booking info to server
                const response = await axios.post(`https://bookstore-backend-bice.vercel.app/api/place/bookings`, {
                    checkIn, checkOut, numberOfGuests, name, phone,
                    place: place._id,
                    user: state.user._id,
                    price: (numberOfNights * place.price),
                    payment: "unverified",
                });
                // setting the bookings to true
                const { data } = response.data;
                await axios.get(`https://bookstore-backend-bice.vercel.app/api/place/booked/${place._id}`);
                const bookingId = data?._id;
                toast.success(`Booking Successfull!`);
                navigate(`/account/bookings/${bookingId}`);
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className='bg-white p-4 rounded-lg'>
            <div className='text-xl font-semibold text-center'>
                Price: ${place.price} / per night
            </div>
            <h2 className='font-semibold text-gray-500 italic text-sm -mb-3 mt-3'>Select the dates to fill the info.</h2>
            <div className="border rounded-lg mt-4">
                <div className="flex">
                    <div className='px-4 py-3 rounded w-1/2'>
                        <label htmlFor="checkIn">Check In: </label>
                        <input type="date"
                            name="checkIn"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className='px-4 py-3 rounded w-1/2 border-l'>
                        <label htmlFor="checkOut">Check Out: </label>
                        <input type="date"
                            name="checkOut"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className='px-4 py-3 rounded border-t'>
                    <label htmlFor="checkOut">Number of Guests: </label>
                    <input type="number"
                        name="checkOut"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(e.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className='px-4 py-3 rounded border-t'>
                        <label htmlFor="name">Your Full Name </label>
                        <input type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="phone">Phone Number </label>
                        <input type="tel"
                            name="phone"
                            value={phone}
                            placeholder='98xxxxxxxx'
                            min={10}
                            max={13}
                            required
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">
                Book this Place for:
                {numberOfNights > 0 && (
                    <span className='text-2xl'> ${numberOfNights * place.price}</span>
                )}
            </button>
            <div>
                <h3 className='italic mt-3'>**Additional charges for extra requirements</h3>
            </div>
        </div>
    )
}

export default BookingWidget





