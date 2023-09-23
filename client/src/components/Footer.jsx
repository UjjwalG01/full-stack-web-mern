import { Avatar, Stack } from '@mui/material';
import React from 'react';
import { SocialIcon } from 'react-social-icons';

function Footer() {
    return (
        <div className='justify-center'>
            <div className='mt-8 p-8 bg-slate-800 text-white px-6 h-96 justify-center'>
                <ul role="list" className="divide-y divide-gray-100">
                    <li className="grid-cols-3 items-center gap-x-6 py-5 justify-around flex">
                        <div className="min-w-0 gap-x-4 w-1/3 justify-center h-[280px] py-4">
                            <div className="flex gap-1 items-center justify-center">
                                <h2 className='font-semibold text-lg mb-4'>Our Social Links</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                            </div>
                            <div className="min-w-0 flex mt-2 justify-center">
                                <SocialIcon target='_blank' url='https://www.facebook.com/login' />
                                <SocialIcon target='_blank' url='https://www.twitter.com/login' />
                                <SocialIcon target='_blank' url='https://www.linkedin.com/login' />
                                <SocialIcon target='_blank' url='https://www.instagram.com/accounts/login/' />
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center w-1/3 h-[280px] py-4">
                            <p className="text-xl font-semibold mb-2 leading-6 text-gray-100">Quick Shortcuts</p>
                            <p className="text-md leading-6 text-gray-100">View Places</p>
                            <p className="text-md leading-6 text-gray-100">View Categories</p>
                            <p className="text-md leading-6 text-gray-100">View Current trends</p>
                        </div>
                        <div className='w-1/3 flex justify-center h-[280px] py-4'>
                            <div>
                                <p className="text-xl font-semibold mb-4 leading-6 justify-center flex text-gray-100">Our Members</p>
                                <Stack direction="row" spacing={1}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </Stack>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <hr />
            <div>
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">We have not satisfied any customers yet but,</h2>
                        <h2 className="text-center text-3xl mt-4 font-bold leading-8 text-gray-900">We are Inspired From</h2>
                        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                            <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://th.bing.com/th/id/OIP.PCjsOztpvwrhInHj6dIOwwHaE8?pid=ImgDet&rs=1" alt="Transistor" width="158" height="48" />
                            <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://th.bing.com/th/id/R.11566b13ebe3fe195137ce2bd1804a69?rik=Og%2bcKTbfN4mhBA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f03%2fAirbnb_logo.png&ehk=QhLUqOjF6HxBvuuxjqpvtKEeCf%2bnDOuAUWx8DInRPOo%3d&risl=&pid=ImgRaw&r=0" alt="Reform" width="158" height="48" />
                            <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://th.bing.com/th/id/OIP.P08L-5YVa-EIWrBMzCs2-gAAAA?pid=ImgDet&rs=1" alt="Tuple" width="158" height="48" />
                            <img className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://th.bing.com/th/id/R.a76ad342d641a59b8f5aae0cfff9a6ac?rik=rRqaYVPP00LLKw&pid=ImgRaw&r=0" alt="SavvyCal" width="158" height="48" />
                            <img className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://th.bing.com/th/id/R.2d897abd4c702fa30afcef116e0e0840?rik=V%2fUeDTuvUU9WTQ&pid=ImgRaw&r=0" alt="Statamic" width="158" height="48" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer