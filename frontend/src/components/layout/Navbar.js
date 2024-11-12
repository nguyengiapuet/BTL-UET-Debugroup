import { FaSearch } from 'react-icons/fa';
import { AiFillAppstore, AiFillStar } from 'react-icons/ai';
import jsLogo from '../../asset/image.png';
import { useState } from 'react';
import SidebarTreeView from './LayerTree';
import { AiFillGithub } from 'react-icons/ai';

// Left Navbar Page
function Navbar({isNavOpen}) {
    const [activeButton, setActiveButton] = useState('Category');
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div>
      {isNavOpen &&
        <div className="coding-box bg-[#ffffff] w-[300px] min-h-screen max-h-screen overflow-y-scroll flex flex-col items-center gap-7 px-6 py-5">
            {/* Main logo app */}
            <div className=" w-full h-11 flex items-center justify-center">
                <img src={jsLogo} />
            </div>
            {/* Social button link */}
            <div className="flex flex-row items-center justify-center gap-3">
                <button className="hover:bg-gray-200 flex flex-row items-center gap-1 border-[1px] border-[#D9D9D9] rounded-md px-3 py-1 text-sm">
                    <AiFillGithub />
                    Code
                </button>
                <button className="hover:bg-gray-200 flex flex-row items-center gap-1 border-[1px] border-[#D9D9D9] rounded-md px-3 py-1 text-sm">
                    <AiFillStar className="text-yellow-400" />
                    Review
                </button>
            </div>

            <div className="relative bg-[#EDEDED] rounded-full w-full flex py-[5px] items-center justify-between">
                {/* Slider background */}
                <div
                    className={`absolute top-[4px] bottom-[4px] left-[3px] right-[3px] w-[calc(50%-6px)] bg-white rounded-full shadow-xl transition-transform duration-300 ${
                        activeButton === 'Following' ? 'translate-x-full' : 'translate-x-[3px]'
                    }`}
                ></div>

                {/* Category Button */}
                <button
                    className={`relative z-10 px-4 py-2 left-[3px] flex items-center justify-start gap-1 text-sm font-bold rounded-full ${
                        activeButton === 'Category' ? 'text-gray-700' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveButton('Category')}
                >
                    <AiFillAppstore
                        className={`${activeButton === 'Category' ? 'text-[#9C6317]' : 'text-[#6262629e]'}`}
                    />
                    Category
                </button>

                {/* Following Button */}
                <button
                    className={`relative z-10 px-4 py-2 right-[3px] flex items-center justify-center gap-1 text-sm font-bold rounded-full ${
                        activeButton === 'Following' ? 'text-gray-700' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveButton('Following')}
                >
                    <AiFillStar className={`${activeButton === 'Following' ? 'text-[#9C6317]' : 'text-[#6262629e]'}`} />
                    Following
                </button>
            </div>

            {/* Search button */}
            <div
                className={`w-full border-2 rounded-3xl flex items-center px-4 transition-colors duration-300 ${
                    isFocused ? 'border-[#D68E2F] boder-1' : 'border-[#D9D9D9]'
                }`}
            >
                <FaSearch className={`${isFocused ? 'text-sky-600' : 'text-[#D9D9D9]'}`} />
                <input
                    type="text"
                    placeholder="Enter your text"
                    className="w-full rounded-full font-normal text-sm py-2 px-2 outline-none"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>

            {/* Layer tree view */}
            <SidebarTreeView />
        </div>
      }
      </div>
    );
}

export default Navbar;
