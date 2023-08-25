import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/AuthProvider';

function AccountNav() {
    const { pathname } = useLocation();
    const { state, dispatch } = useContext(UserContext);
    let subpage = pathname.split('/')?.[2];
    if (subpage === undefined) {
        subpage = 'profile';
    }

    function linkClasses(type = null) {
        let classes = "inline-flex gap-2 py-3 px-6 text-xl font-bold rounded-full";

        if (type === subpage) {
            classes += " bg-primary dark:text-gray-100"
        } else {
            classes += " bg-gray-300"
        }
        return classes;
    }

    return (
        <>
            <div
                className="flex rounded-b-3xl bg-gray-100 dark:bg-gray-100 space-y-5 flex-col items-center py-7">
                <img className="h-28 w-28 rounded-full"
                    src="https://th.bing.com/th/id/R.bae2d37c4317140a408aef6671346186?rik=2DNeSZ%2fD0xtseQ&pid=ImgRaw&r=0"
                    alt="User" />
                <Link to="#">
                    <span className="text-xl font-semibold">{state.user?.name}</span>
                </Link>
            </div>
            <nav
                className="grid px-7 py-2  items-center justify-around grid-cols-3 gap-4 divide-x divide-solid ">

                <div className="col-span-1 pt-3 flex flex-col items-center ">
                    <Link to="/account/profile" className={linkClasses('profile')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        My Profile
                    </Link>
                </div>
                <div className="col-span-1 px-3 flex flex-col items-center ">
                    <Link to={'/account/accomodations'} className={linkClasses('accomodations')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                        Accomodation
                    </Link>
                </div>
                <div className="col-span-1 px-3 flex flex-col items-center ">
                    <Link to={'/account/bookings'} className={linkClasses('bookings')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        Bookings
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default AccountNav