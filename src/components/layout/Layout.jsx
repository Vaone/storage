import React from 'react';
import Navbar from "../navbar/Navbar.jsx";
import {Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet context={{ isAuth }} />
            </main>
        </>
    );
};

