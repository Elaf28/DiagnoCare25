import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Nav_bar from '../Navbar/Nav_bar';

export default function PublicLayout() {
    return (
        <>
            <Nav_bar/>
            <main style={{ minHeight: '70vh' }}> 
                <Outlet />
            </main>
            <Footer/> 
        </>
    );
}