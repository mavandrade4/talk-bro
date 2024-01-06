import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './nav/nav';
import Footer from './footer/footer';

export default function Root() {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}