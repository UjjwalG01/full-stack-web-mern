import React, { useContext } from 'react'
import Accomodations from './Accomodations';
import AccountNav from './AccountNav';

function PlacePage() {
    return (
        <div>
            <AccountNav />
            <Accomodations />
        </div>
    )
}

export default PlacePage