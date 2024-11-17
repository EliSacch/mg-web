import React, { useState } from 'react';
// hooks
import { useEffect } from 'react';
// context
import { useAuthContext } from '../context/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
// componenets
import NavigationForAdmin from "../components/NavigationForAdmin";


const LayoutForAdmin = ({
    handleOpen,
    handleClose,
    setModalChildren
}) => {
    const { authIsReady, user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (authIsReady && !user) {
          navigate("/login");
        } else if (authIsReady && !user?.isAdmin) {
            navigate("/");
        }
      }, [user, authIsReady, navigate])

    return (
        <>
            <header>

                {authIsReady && (
                    <NavigationForAdmin
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        setModalChildren={setModalChildren}
                    />
                )}

            </header>

            { /* main*/}
            {authIsReady && <Outlet />}

            <footer>

            </footer>
        </>
    );
};

export default LayoutForAdmin;