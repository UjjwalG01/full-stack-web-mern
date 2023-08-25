import axios from 'axios';
import React, { useState } from 'react'

function Carousel({ places }) {
    const handleNext = () => { };
    const handlePrev = () => { };

    return (
        <div className="m-auto px-4 py-16 relative w-full h-[700px]">
            {places.length > 0 ? places.map((place) => (
                <div key={place._id} className="absolute inset-0 w-full h-full rounded-2xl flex transition-transform duration-1000 ease-in-out">
                    <img src={'http://localhost:4000/' + place?.photo?.[0]} className="w-full h-full px-8 flex items-center justify-center bg-gray-100 object-cover" />
                </div>
            )) : (<h2 className='text-2xl text-center font-bold'>No Images Available</h2>)}

            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 bg-white rounded-full shadow-lg focus:outline-none" onClick={handlePrev}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 bg-white rounded-full shadow-lg focus:outline-none" onClick={handleNext}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
}

export default Carousel