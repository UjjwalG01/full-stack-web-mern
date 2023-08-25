import React from 'react'

function InputLabel(props) {
    return (
        <>
            <h2 className='text-2xl font-bold mt-4'>{props.label}</h2>
            <p className='text-gray-500 text-sm'>{props.small}</p>
        </>
    )
}

export default InputLabel