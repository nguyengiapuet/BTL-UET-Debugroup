/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';

function Dashboard() {
    const [allUser, setAllUser] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(SummaryApi.getAllUsers.url);

            if (response.data.success) {
                setAllUser(response.data.data);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`${SummaryApi.deletedUser.url}/${id}`);

            if (response.data.success) {
                toast.success(response.data.message);
                setAllUser(allUser.filter((user) => user.id !== id));
            }
        } catch (err) {}
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="w-full h-screen flex justify-center bg-[#ECECEC]">
            <div className="w-[1000px] mt-10">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search for name or email"
                        className="outline-none h-10 px-4 w-56 py-1 rounded-full border-2 border-[#acacac] bg-white"
                    />

                    <div className="flex items-center gap-2">
                        <p className="text-[#5f5f5f]">Sorted by:</p>
                        <input
                            type="select"
                            className="py-2 px-4 w-40 rounded-full outline-none text-[#5f5f5f]"
                            value={'Date created'}
                        />
                    </div>

                    <div className="ml-auto text-white bg-[#9c6317] py-2 px-8 cursor-pointer hover:bg-opacity-80 rounded-full">
                        Search
                    </div>
                </div>

                <div className="w-full h-[400px] mt-8 rounded-3xl py-1 bg-white">
                    <table className="w-full userTable mt-4">
                        <thead>
                            <tr className="h-10">
                                <th className="border-none">Username</th>
                                <th>Email</th>
                                <th>Intro</th>
                                <th>UpdateAt</th>
                                <th>CreateAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allUser.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>null</td>
                                        <td>{new Date(user.created_at).toLocaleString()}</td>
                                        <td>{new Date(user.created_at).toLocaleString()}</td>
                                        <td>
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="text-white bg-[#9c6317] py-1 px-6 rounded-full hover:bg-opacity-80 cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="h-12 w-full mt-6 flex items-center">
                    <div className="h-full w-12 flex items-center cursor-pointer justify-center ml-10 font-semibold border-2 border-[#b4b4b4] text-[#9c6317] text-2xl bg-white rounded-xl">
                        1
                    </div>
                    <div className="h-full w-12 flex items-center cursor-pointer justify-center ml-10 font-semibold border-2 border-[#b4b4b4] text-[#9c6317] text-2xl bg-white rounded-xl">
                        2
                    </div>
                    <div className="h-full w-12 flex items-center cursor-pointer justify-center ml-10 font-semibold border-2 border-[#b4b4b4] text-[#9c6317] text-2xl bg-white rounded-xl">
                        3
                    </div>
                    <div className="w-12 flex items-center cursor-pointer justify-center h-full ml-10 font-semibold border-2 border-[#b4b4b4] text-[#9c6317] text-2xl bg-white rounded-xl">
                        <FaArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
