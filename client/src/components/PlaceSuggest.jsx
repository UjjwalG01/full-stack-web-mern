import { Badge } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function PlaceSuggest({ item: place }) {
    return (
        <Badge className='cursor-pointer w-full' key={place._id} color="secondary" badgeContent={place.booked === true ? "Booked" : null}>
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
    )
}

export default PlaceSuggest