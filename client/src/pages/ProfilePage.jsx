import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Profile from '../components/Profile';
import AccountNav from '../components/AccountNav';

function ProfilePage() {

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  return (
    <div>
      <div
        className="h-full flex flex-col bg-gray-100 dark:bg-gray-100 shadow-xl overflow-y-scroll">
        <div className="bg-gray-200 shadow-lg pb-3 rounded-b-3xl">
          <AccountNav />
        </div>

        <div
          className="bg-gray-50 dark:bg-gray-300 m-3 mt-5 py-5 rounded-2xl">

          {subpage === "profile" && (
            <Profile />
          )}
        </div>
      </div >
    </div >
  )
}

export default ProfilePage