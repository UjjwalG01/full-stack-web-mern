import React, { useContext } from 'react';
import { UserContext } from '../context/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedLayouts() {
    const { state } = useContext(UserContext);
    return (
        <React.Fragment>
            {state.user?.name ? (
                <Outlet />
            ) : (
                <Navigate to={"/login"} />
            )}
        </React.Fragment>
    )
}

export default ProtectedLayouts