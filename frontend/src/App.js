import { Outlet } from "react-router-dom";
import "./App.css";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { useContext } from "react";

function App() {

    return (
        <>
            <div className="flex">
                <Navbar />

                <div className="w-full h-screen overflow-hidden">
                    <Header/>

                    <main>
                        <Outlet />
                    </main>
                </div>
                
                <ToastContainer
                    className="mt-10"
                    position="top-right"
                    autoClose={2000}
                />
            </div>
        </>
    );
}

export default App;
