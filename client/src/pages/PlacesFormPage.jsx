import React, { useContext, useEffect, useState } from 'react'
import InputLabel from '../components/InputLabel';
import Perks from '../components/Perks';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import { toast } from 'react-toastify';
import { UserContext } from '../context/AuthProvider';

function PlacesFormPage() {
    const { id } = useParams();
    const { state } = useContext(UserContext);
    const user = JSON.parse(localStorage.user);

    console.log(state.user._id)
    console.log(user._id)

    const [data, setData] = useState({
        owner: state?.user?._id,
        title: '',
        address: '',
        description: '',
        price: '',
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: 0,
        booked: false,
    })
    const [image, setImages] = useState([]);
    const [perks, setPerks] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get(`http://127.0.0.1:4000/api/place/${id}`).then((response) => {
            const { data } = response.data;
            setData({
                ...data,
            })
        });
    }, [id])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleImage = (e) => {
        if (data.photo) {
            console.log(data)
        }
        setImages(e.target.files[0]);
    }

    const submitData = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // update data
                const formData = new FormData();
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key]);
                });
                formData.append('photo', image);
                perks.forEach(perk => {
                    formData.append('perks', perk);
                })

                await axios.put(`http://localhost:4000/api/place/${id}`, formData)
                setRedirect(true);
            } else {
                const formData = new FormData();
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key]);
                });
                formData.append('photo', image);
                perks.forEach(perk => {
                    formData.append('perks', perk);
                })

                await axios.post(`http://localhost:4000/api/place/create`, formData);
                toast.success("New place created successfully!")
                setRedirect(true);
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/accomodations'} />
    }

    return (
        <div className='mx-2 bg-gray-300 px-3 py-4'>
            <AccountNav />
            <form onSubmit={submitData}>
                <InputLabel label="Title" small="Title/Heading for your apartment or rooms" />
                <input required type="text" name='title' value={data.title} onChange={handleChange} placeholder='Enter title' />

                <InputLabel label="Address" small="Address/Location of the place" />
                <input required type="text" name='address' value={data.address} onChange={handleChange} placeholder='Enter Address' />

                <InputLabel label="Description" small="A detailed description about your place" />
                <textarea name="description" value={data.description} onChange={handleChange} placeholder='Enter description' id="description" rows="7"></textarea>

                <InputLabel label="Price" small="Price in NPR" />
                <input required type="text" name='price' value={data.price} onChange={handleChange} placeholder='Enter Price' />

                <InputLabel label="Photos" small="Add attractive pictures of the place." />
                <div className='mt-4 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                    <label className='flex gap-2 cursor-pointer items-center border bg-white rounded-2xl p-2 text-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        <input onChange={handleImage} multiple name='photo' type="file" className='hidden' />
                        Upload
                    </label>
                    <div>
                        {/* {image.length > 0 && image.map(img => (
                            <img src={'http://localhost:4000/' + img[0]} alt="" />
                        ))} */}
                    </div>
                </div>

                <InputLabel label="Services/Perks" small="Select all the services and perks available" />
                <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                <InputLabel label="Extra Info" small="If any kinds of rules or demands" />
                <textarea name="extraInfo" value={data.extraInfo} onChange={handleChange} rows="5" placeholder='Eg:: No smoking allowed'></textarea>

                <InputLabel label="Timings and Guests" small="Add the check-in and check-out time and max numner of guests" />
                <div className='grid gap-2 sm:grid-cols-3'>
                    <div>
                        <h3 className='mt-2 -mb-1 font-bold'>Check In</h3>
                        <input required type="text" name='checkIn' value={data.checkIn} onChange={handleChange} placeholder='04:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1 font-bold'>Check Out</h3>
                        <input required type="text" name='checkOut' value={data.checkOut} onChange={handleChange} placeholder='11:30' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1 font-bold'>Max Guests</h3>
                        <input required type="number" name='maxGuests' value={data.maxGuests} onChange={handleChange} placeholder='2' />
                    </div>
                </div>

                <div className='my-4 grid grid-cols-3'>
                    <button type='submit' className='primary'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage