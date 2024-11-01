import { FaBox, FaClipboardList, FaHome, FaSearch, FaStar } from 'react-icons/fa';
import logo from '../asset/Logo.png';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Dashboard from '../pages/Dashboard';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
    const [active, setActive] = useState('home');
    const { setTitle } = useContext(AuthContext);

    const handleClickActive = async (e) => {
        await setActive(e.target.value);
    };

    console.log(active);

    return (
        <div className="coding-box bg-[#ffffff] w-[320px] min-h-screen flex flex-col items-center gap-8 px-6">
            <div className=" w-full h-28 flex items-center justify-center">
                <p className="text-[#9C6317] text-4xl shadow-xl font-semibold">Debugroup</p>
            </div>

            <div className="h-14 bg-[#D9D9D9] rounded-full w-full flex p-2">
                <div className="bg-[#9C6317] cursor-pointer rounded-full px-4 flex text-white items-center justify-center gap-1">
                    <FaBox className="text-white" />
                    Category
                </div>
                <div className="rounded-full cursor-pointer text-[#626262] px-2 font-medium flex items-center justify-center gap-1">
                    <FaStar className="text-[#6262629e]" />
                    Following
                </div>
            </div>

            <div className="w-full border-[#D9D9D9] border-2 rounded-full flex items-center px-4">
                <FaSearch className="text-[#b6b5b5] text-xl" />
                <input
                    type="text"
                    placeholder="Enter your text"
                    className="w-full rounded-full font-normal py-2 px-2 outline-none"
                />
            </div>

            <Link to={'/pen'} className="coding-btn animated-button1" href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Start Coding
            </Link>
            {/* <a className='coding-btn'>start coding</a> */}

            <div className=" h-full w-full flex flex-col gap-2">
                <button
                    value={'home'}
                    className="flex gap-4 items-center rounded-md px-2 py-1 hover:bg-slate-200"
                    onClick={handleClickActive}
                >
                    <FaHome
                        className={`${active === 'home' ? 'text-[#9c6317] text-3xl' : 'text-[#7a7a7a] text-3xl'}`}
                    />
                    <Link
                        to={'/'}
                        onClick={() => setTitle('Home')}
                        className={`${active === 'home' ? 'text-[#9c6317]' : 'text-[#7a7a7a] font-normal'}`}
                    >
                        <button value={'home'}>Home</button>
                    </Link>
                </button>
                <button
                    value={'dashboard'}
                    className="flex gap-4 items-center rounded-md px-2 py-1 hover:bg-slate-200"
                    onClick={handleClickActive}
                >
                    <FaClipboardList
                        className={`${active === 'dashboard' ? 'text-[#9c6317] text-3xl' : 'text-[#7a7a7a] text-3xl'}`}
                    />
                    <Link
                        to={'/dashboard'}
                        onClick={() => setTitle('Dashboard')}
                        className={`${active === 'dashboard' ? 'text-[#9c6317]' : 'text-[#7a7a7a] font-normal'}`}
                    >
                        <button value={'dashboard'}>Dashboard</button>
                    </Link>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
