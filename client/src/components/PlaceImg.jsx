import React from 'react'

function PlaceImg({ place, index = 0, className = null }) {
    if (!place.photo?.length) {
        return '';
    }
    if (!className) {
        className = ' object-cover ';
    }
    return (
        <img className={className} src={'https://bookstore-backend-bice.vercel.app/' + place.photo?.[index]} alt="" />
    )
}

export default PlaceImg