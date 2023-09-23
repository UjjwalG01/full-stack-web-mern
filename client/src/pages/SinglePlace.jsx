import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

// Suggestion card component
import PlaceSuggest from '../components/PlaceSuggest';

// For place recommendation
import { FrequentlyBoughtTogether, RelatedProducts } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';
const recommendClient = recommend('TE2UG7ZZZ5', '04ab6eb9c53667c56ec85aa59abba2d4');
const indexName = 'advance-griha-algo';

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
        <div className=' bg-gray-100 px-8 py-4'>
            <div className='bg-gray-300 p-3 mb-3 rounded-xl'>
                <h1 className='text-3xl font-semibold'>{place.title}</h1>
                <div className='uppercase font-bold flex gap-2 pt-1.5 pb-1 rounded-lg w-72 my-2'>
                    {place.category === 'premium' ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="primary" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="primary" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    }
                    <h2 className='text-xl'>{place.category} room suite</h2>
                </div>
                <AddressLink place={place} />
            </div>
            <PlaceGallery place={place} />
            <div className='my-8 gap-8 grid grid-cols-1 md:grid-cols-[3fr_2fr]'>
                <div className='text-lg'>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                    <div className='grid grid-cols-3 font-semibold text-lg rounded-lg bg-white'>
                        <h2 className='bg-gray-300 m-3 rounded-lg p-3'>Check-In Time: {place.checkIn} P.M</h2>
                        <h2 className='bg-gray-300 m-3 rounded-lg p-3'>Check-Out Time: {place.checkOut} A.M</h2>
                        <h2 className='bg-gray-300 m-3 rounded-lg p-3'>Maximum Guests: {place.maxGuests}</h2>
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
            <div className='bg-white -mx-4 my-6 p-4 rounded-xl border-t'>
                <h2 className='text-2xl font-semibold -mb-6 my-2'>Related Places</h2>
                <div>
                    <RelatedProducts
                        recommendClient={recommendClient}
                        indexName={indexName}
                        objectIDs={["291c543301a9e_dashboard_generated_id"]}
                        // queryParameters={{
                        //     facetFilters: [
                        //         `address:${PropTypes.object.address}`,
                        //     ]
                        // }}
                        maxRecommendations={8}
                        classNames={{
                            list: 'grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 mx-2 pb-8',
                            title: 'hidden',
                            item: 'w-full object-cover'
                        }}
                        itemComponent={(props) => (
                            <PlaceSuggest {...props} />
                        )
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default SinglePlace