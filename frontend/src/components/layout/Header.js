import { Link } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../common/constants';
import { FaLock, FaRegBell, FaSearch, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineBell } from 'react-icons/ai';

function Header() {
    const { userData, setUserData } = useContext(AuthContext);
    const [openPop, setOpenPop] = useState(false);
    const { title, setTitle } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setUserData({
            id: '',
            username: '',
            email: '',
            password: '',
            role: '',
            avatar: '',
        });
    };

    return (
        <div className="w-full bg-[#EFF2F7] px-4 py-4">
            <div className="h-6 w-full flex items-center container mx-auto gap-5 ">
                <div className="flex items-center gap-2 w-1/3">
                    <AiOutlineMenu className="text-gray-700 text-xl font-bold" />
                    {/* <p className="text-2xl font-medium text-[#545454]">{title}</p> */}
                </div>

                <div className="flex items-center bg-[#D9E2EF] rounded-full py-[2px] px-4 grow">
                    <FaSearch className="text-gray-500 text-sm" />
                    <input
                        type="text"
                        className="h-8 w-72 rounded-r-full bg-[#D9E2EF] px-4 outline-none text-sm"
                        placeholder="Search"
                    />
                </div>
                <div>
                    <AiOutlineBell className="text-xl font-bold" />
                </div>

                <div className="">
                    {userData.id ? (
                        <div className="flex gap-2 items-center">
                            <FaRegBell className="text-2xl text-[#9C6317]" />
                            <p className="text-lg font-semibold">{userData.username}</p>
                            <div className="h-10 w-10 relative">
                                <div onClick={() => setOpenPop(!openPop)} onBlur={() => setOpenPop(false)}>
                                    {userData.avatar ? (
                                        <img
                                            src={userData.avatar}
                                            alt="avatar"
                                            className="cursor-pointer w-full h-full rounded-full border-[#9C6317] border-2 "
                                        />
                                    ) : (
                                        <FaUserCircle className="cursor-pointer w-full h-full rounded-full border-[#9C6317] border-2 " />
                                    )}
                                </div>
                                {openPop && (
                                    <div className="absolute flex flex-col w-44 px-2 bg-white h-fit rounded-md -bottom-[340%] -right-[130%]">
                                        <Link
                                            to={'/profile'}
                                            onClick={() => {
                                                setTitle('Quản lý tài khoản');
                                                setOpenPop(false);
                                            }}
                                            className="flex gap-1 items-center text-[#454545] bg-white px-1 py-2 cursor-pointer hover:opacity-90 hover:text-[#9C6317] font-medium border-b-2 rounded-tl-md rounded-tr-md"
                                        >
                                            <FaUser />
                                            Thông tin cá nhân
                                        </Link>
                                        <Link
                                            to={'/privacy'}
                                            onClick={() => {
                                                setTitle('Quản lý tài khoản');
                                                setOpenPop(false);
                                            }}
                                            className="flex gap-1 items-center text-[#454545] bg-white px-1 py-2 cursor-pointer hover:opacity-90 hover:text-[#9C6317] font-medium border-b-2 "
                                        >
                                            <FaLock />
                                            Đổi mật khẩu
                                        </Link>
                                        <Link
                                            to={'/login'}
                                            onClick={() => {
                                                setTitle('Quản lý tài khoản');
                                                setOpenPop(false);
                                            }}
                                            className="flex gap-1 items-center text-[#454545] bg-white px-1 py-2 cursor-pointer hover:opacity-90 hover:text-[#9C6317] font-medium rounded-bl-md rounded-br-md"
                                        >
                                            <FaSignOutAlt />
                                            Đăng Xuất
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div
                                className="border-[#9C6317] border-2 py-1 px-3 hover:bg-grenn-600 hover:text-white rounded text-lg font-medium text-[#9C6317] hover:bg-[#9C6317]"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row justify-center items-center gap-5">
                            <Link
                                to={'login'}
                                className="hover:bg-gray-200 px-5 py-1 border-[1px] border-gray-400 rounded-md hover:text-[#0d6efd] font-bold text-sm text-[#9C6317]"
                            >
                                Login
                            </Link>
                            <Link
                                to={'signup'}
                                className="bg-[#9C6317] flex items-center justify-center px-4 py-1 rounded-md text-sm font-medium text-white"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
