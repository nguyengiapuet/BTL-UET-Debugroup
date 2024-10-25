import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryApi from '../common'
import { LOCAL_STORAGE_TOKEN_NAME } from '../common/constants'
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function LogIn() {
    const { loadUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleOnChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(SummaryApi.logIn.url, data)

            if(response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
                await loadUser()
                toast.success(response.data.message)
                navigate('/')

            }
        } catch (err) {
            console.log(err.message);
        }


    }

    return (  
        <div className=" bg-slate-200">
            <div className="flex w-full h-screen justify-center items-center">
                <form className="h-[400px] w-[400px] bg-white flex flex-col gap-4 px-4 py-2 rounded" onSubmit={handleOnSubmit}>
                    <div className="flex justify-center w-full">
                        <label className="text-2xl text-green-600 font-semibold">Login</label>
                    </div>

                    <div className="">
                        <label className="text-lg font-semibold">Email: </label>
                        <input name="email" value={data.email} onChange={handleOnChange} type="text" placeholder="Enter your email" className="outline-none rounded p-2 h-8 w-full bg-slate-200" />
                    </div>

                    <div className="">
                        <label className="text-lg font-semibold">Password: </label>
                        <input name="password" value={data.password} onChange={handleOnChange} type="password" placeholder="Enter your password" className="outline-none p-2 rounded h-8 w-full bg-slate-200" />
                    </div>

                    <div className="flex justify-center gap-2 py-4">
                        <Link to={'/signup'} className="bg-gray-400 text-white p-2 flex justify-center rounded w-full hover:bg-opacity-80">Register</Link>
                        <button className="bg-green-600 text-white p-2 rounded w-full hover:bg-opacity-80">Login</button>
    
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default LogIn;