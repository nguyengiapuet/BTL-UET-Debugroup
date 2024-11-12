import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';

function App() {
  const [isNavOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen(prevState => !prevState);
    return (
        <>
            <div className="flex max-h-screen overflow-hidden">
                <Navbar isNavOpen={isNavOpen}/>
                <div className="w-full max-h-screen overflow-hidden bg-[#EFF2F7]">
                    <Header isNavbarOpen={isNavOpen} toggleNav={toggleNav}/>

                    <main>
                        <Outlet />
                    </main>
                </div>

                <ToastContainer className="mt-10" position="top-right" autoClose={2000} />
            </div>
        </>
    );
}

export default App;
