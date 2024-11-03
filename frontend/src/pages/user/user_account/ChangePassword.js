import { useContext, useState } from 'react';
import { FaCog, FaEdit } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
function ChangePassword() {
    // const { userData, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword) {
            setError('Password does not match');
            return;
        }
        try {
            const response = await axios.post(SummaryApi.signUp.url, data);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    return (
        <div className=" w-full h-[90vh] bg-slate-100 flex justify-center items-center flex-col gap-4">
            <form onSubmit={handleOnSubmit}>
                <div className="h-fit w-[75%] bg-slate-200 rounded-xl px-4 py-4">
                    <div className="flex items-center gap-36">
                        <div>
                            <div className="text-3xl text-[#9C6317] font-medium">Your private info</div>
                            <p className="w-[600px] text-lg text-[#505050]">
                                Private info and options to manage it. You can make some of this private info.
                            </p>
                        </div>
                        <FaCog className="text-5xl text-[#9C6317]" />
                    </div>
                    <div className="mt-12 flex flex-col gap-4">
                        <div className="flex gap-8 items-center w-fit relative">
                            <label className="text-[#505050] text-lg w-32">Email:</label>
                            <input
                                required
                                onChange={handleOnChange}
                                type="text"
                                name="email"
                                value={data.email}
                                className="text-[#505050] text-lg outline-none w-72 px-2 py-1 rounded-lg"
                                placeholder="UserA"
                            />
                            <FaEdit className="absolute top-1 right-2 text-2xl cursor-pointer" />
                        </div>
                        <div className="flex gap-8 items-center w-fit relative">
                            <label className="text-[#505050] text-lg w-32">Password:</label>
                            <input
                                required
                                onChange={handleOnChange}
                                type="password"
                                name="password"
                                value={data.password}
                                className="text-[#505050] text-lg outline-none w-72 px-2 py-1 rounded-lg"
                                placeholder="Password"
                            />
                            <FaEdit className="absolute top-1 right-2 text-2xl cursor-pointer" />
                        </div>
                        <div className="flex gap-8 items-center w-fit relative">
                            <label className="text-[#505050] text-lg w-32">Confirm password:</label>
                            <input
                                required
                                onChange={handleOnChange}
                                type="password"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                className="text-[#505050] text-lg outline-none w-72 px-2 py-1 rounded-lg"
                                placeholder="Confirm password"
                            />
                            <FaEdit className="absolute top-4 right-2 text-2xl cursor-pointer" />
                        </div>
                    </div>
                    {error && <p style={{ color: 'red', margin: '10px' }}>{error}</p>}
                    <button className="bg-[#7e158e] font-medium rounded-xl px-2 py-1 ml-40 mt-4 hover:bg-opacity-85 text-white">
                        Save change
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;
