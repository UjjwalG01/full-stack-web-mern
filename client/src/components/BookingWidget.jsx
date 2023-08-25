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
            if (state.user?._id === place.owner) {
                toast.info(`Hey!👋 You own this place!`)
                navigate(`/account/place/${place._id}`);
                return;
            }

            const bookedPlace = await axios.get(`http://localhost:4000/api/place/booked/${place._id}/check`);
            const { booked } = await bookedPlace.data.data;
            console.log(booked);
            if (booked === true) {
                toast.info(`Sorry, place is already booked!`);
                navigate(`/account/place/${place._id}`);
                return;
            } else {
                // setting the bookings to true
                await axios.get(`http://localhost:4000/api/place/booked/${place._id}`);

                // sending the booking info to server
                const response = await axios.post(`http://localhost:4000/api/place/bookings`, {
                    checkIn, checkOut, numberOfGuests, name, phone,
                    place: place._id,
                    user: state.user._id,
                    price: (numberOfNights * place.price),
                });
                const { data } = response.data;
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





