import React from 'react'

function PlaceGallery({ place }) {
    return (
        <div className='relative'>
            <div className='grid gap-2 rounded-2xl overflow-hidden grid-cols-[2fr_1fr]'>
                <div>
                    {place.photo?.[0] && (
                        <img className='aspect-square object-cover w-full' src={`https://bookstore-backend-bice.vercel.app/${place.photo[0]}`} alt="" />
                    )}
                </div>
                <div className='grid'>
                    {place.photo?.[0] && (
                        <img className='aspect-square object-cover' src={`https://bookstore-backend-bice.vercel.app/${place.photo[1]}`} alt="" />
                    )}
                    <div className='overflow-hidden'>
                        {place.photo?.[0] && (
                            <img className='aspect-square object-cover relative top-2' src={`https://bookstore-backend-bice.vercel.app/${place.photo[2]}`} alt="" />
                        )}
                    </div>
                </div>
            </div>
            <button className='flex gap-2 absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl border shadow-md shadow-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Show more photos
            </button>
        </div>
    )
}

export default PlaceGallery