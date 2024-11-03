import { Outlet } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';

function App() {
    return (
        <>
            <div className="flex">
                <Navbar />

                <div className="w-full h-screen overflow-hidden bg-[#EFF2F7]">
                    <Header />

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
