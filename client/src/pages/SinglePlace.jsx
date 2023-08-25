import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

function SinglePlace() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:4000/api/place/${id}`).then(response => {
            const { data } = response.data;
            setPlace(data);
        })
    }, [id]);

    if (!place) return '';

    return (
        <div className=' bg-gray-100 px-8 py-6'>
            <h1 className='text-2xl'>{place.title}</h1>
            <AddressLink place={place} />
            <PlaceGallery place={place} />
            <div className='my-8 gap-8 grid grid-cols-1 md:grid-cols-[3fr_2fr]'>
                <div className='text-lg'>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                    <div className='font-semibold text-lg'>
                        Check-In: {place.checkIn} P.M<br />
                        Check-Out: {place.checkOut} A.M<br />
                        Max. Guests: {place.maxGuests}
                    </div>
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-4 p-4 rounded-xl border-t">
                <h2 className='font-semibold text-2xl my-2'>Extra Info:</h2>
                <div className='text-sm text-gray-700 leading-5'>
                    {place.extraInfo}
                </div>
            </div>
        </div>
    )
}

export default SinglePlace