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
        category: '',
    })
    const [images, setImages] = useState([]);
    const [perks, setPerks] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [categories, setCategoriee] = useState([
        { name: 'Normal', value: "normal" },
        { name: 'Premium', value: "premium" },
    ]);

    useEffect(() => {
        if (!id) return;
        axios.get(`http://127.0.0.1:4000/api/place/${id}`).then((response) => {
            const { data } = response.data;
            setData({
                ...data,
            })
            setImages(data.photo);
            setPerks(data.perks);
            // console.log(response.data.data);
        });
    }, [id])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
        console.log(data);
    };

    const handleImage = async (e) => {
        const files = e.target.files;

        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("images", files[i])
        }
        try {
            const response = await axios.post("https://bookstore-backend-bice.vercel.app/api/place/upload", data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const { data: filenames } = response.data;
            setImages(prev => {
                return [...prev, ...filenames]
            });
        } catch (err) {
            console.log(err)
        }
    }

    const submitData = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Update the existing place
                const res = await axios.put(`https://bookstore-backend-bice.vercel.app/api/place/${id}`, {
                    ...data, images, perks
                });
                console.log(res)
                toast.info("Place updated successfully")
                setRedirect(true);
            } else {
                // Create new place
                await axios.post('https://bookstore-backend-bice.vercel.app/api/place/create', {
                    ...data, images, perks
                });
                setRedirect(true);
            }
        } catch (err) {
            console.log(err);
        }
    }
    if (redirect) {
        return <Navigate to={'/account/accomodations'} />
    }

    const removePhoto = (filename) => {
        setImages([...images.filter(photo => photo !== filename)]);
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

                <InputLabel label="Price" small="Price (in Dollar $)" />
                <input required type="text" name='price' value={data.price} onChange={handleChange} placeholder='Enter Price' />

                <InputLabel label="Category" small="Select the category" />
                <select name="category" value={data.category} className='text-lg py-3' onChange={handleChange} id="category">
                    <option className='text-lg'>-- Select the Category --</option>
                    {categories.map((category) => (
                        <option className='text-lg' name={category.name} value={category.value}>{category.name}</option>
                    ))}
                </select>

                <InputLabel label="Upload image" small="Select the image" />
                <div className='mt-4 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7'>
                    <label className='flex h-32 gap-2 cursor-pointer items-center justify-center border bg-white rounded-xl p-2 text-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        <input onChange={handleImage} multiple name='images' type="file" className='hidden' />
                        Upload
                    </label>
                    {images.length > 0 && images.map(link => (
                        <div className='flex relative h-32'>
                            <img className='h-full w-60 object-cover rounded-lg' src={"http://localhost:4000" + link} alt="" />
                            <button onClick={() => removePhoto(link)} className='absolute bottom-1 right-6 cursor-pointer bg-red-600 bg-opacity-50 rounded-md p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ))}
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