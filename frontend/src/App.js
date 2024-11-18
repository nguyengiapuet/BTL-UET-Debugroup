import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const toggleNav = () => setIsSidebarOpen((prevState) => !prevState);
	return (
		<>
			<div className="flex max-h-screen overflow-hidden">
				<Sidebar isSidebarOpen={isSidebarOpen} />
				<div className="w-full max-h-screen overflow-hidden bg-[#EFF2F7]">
					<Header
						isSidebarOpen={isSidebarOpen}
						toggleNav={toggleNav}
					/>

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
