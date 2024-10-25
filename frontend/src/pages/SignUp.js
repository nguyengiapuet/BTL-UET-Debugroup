import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

function SignUp() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: ''
    })

    const handleOnChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const reader = new FileReader
        reader.readAsDataURL(file)

        const dataImg = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result)

        reader.onerror = (error) => reject(error)
        })

        console.log("dataImg", dataImg);
        

        setData({...data, avatar: dataImg})

    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if(data.password!==data.confirmPassword) {
            alert("Passwords do not match")
            return
        }
        
        try {
            const response = await axios.post(SummaryApi.signUp.url, data)

            if(response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
            }

        } catch (err) {
            console.log(err.message);
            
        }
    }
    return (  
        <div className=" bg-slate-200">
            <div className="flex w-full h-[100vh] justify-center items-center">
                <form onSubmit={handleOnSubmit} className="h-[550px] w-[400px] bg-white flex flex-col gap-4 px-4 py-2 rounded">
                    <div className="flex justify-center w-full">
                        <label className="text-2xl text-green-600 font-semibold">SignUp</label>
                    </div>

                    <div className="w-16 min-h-16 relative rounded-full bg-slate-200 mx-auto overflow-hidden">
                        <div>
                            <img src={data.avatar} alt="" />
                        </div>
                        <label>
                            <div className=" text-center w-full text-sm pb-2 absolute bottom-0 bg-slate-100 bg-opacity-60 cursor-pointer text-[#646464]">upload avatar</div>
                            <input type="file" className="hidden" onChange={handleUploadPic}/>
                        </label>
                    </div>
                    <div className="">
                        <label className="text-lg font-semibold">Username: </label>
                        <input name="username" value={data.username} onChange={handleOnChange} placeholder="Enter your username" type="text" className="outline-none rounded p-2 h-8 w-full bg-slate-200" />
                    </div>
                    
                    <div className="">
                        <label className="text-lg font-semibold">Email: </label>
                        <input name="email" value={data.email} onChange={handleOnChange} placeholder="Enter your email" type="text" className="outline-none rounded p-2 h-8 w-full bg-slate-200" />
                    </div>

                    <div className="">
                        <label className="text-lg font-semibold">Password: </label>
                        <input name="password" value={data.password} onChange={handleOnChange} placeholder="Enter your password" type="password" className="outline-none p-2 rounded h-8 w-full bg-slate-200" />
                    </div>

                    <div className="">
                        <label className="text-lg font-semibold">Confirm Password: </label>
                        <input name="confirmPassword" value={data.confirmPassword} onChange={handleOnChange} placeholder="Enter confirm-password" type="password" className="outline-none p-2 rounded h-8 w-full bg-slate-200" />
                    </div>

                    <div className="flex justify-center gap-2 py-4">
                        <Link to={'/login'} className="bg-gray-400 text-white p-2 flex justify-center rounded w-full hover:bg-opacity-80">Login</Link>
                        <button className="bg-green-600 text-white p-2 rounded w-full hover:bg-opacity-80">Register</button>
    
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default SignUp;