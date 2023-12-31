import React from 'react';
import KhaltiCheckout from "khalti-checkout-web";
import config from './KhaltiConfig';

function Khalti() {
    let checkout = new KhaltiCheckout(config);
    return (
        <div>
            <button onClick={() => checkout.show({ amount: 1000 })}>Pay via Khalti</button>
        </div>
    )
}

export default Khalti