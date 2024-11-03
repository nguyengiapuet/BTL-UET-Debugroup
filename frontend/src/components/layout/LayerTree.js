import { FaHome } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';

// Should check if user is not admin, disable Dashboard section
function SidebarTreeView() {
    return (
        <div>
            <div className="w-64 pt-3 rounded-r-lg">
                {/* Home parent */}
                <div className="pl-4 mb-4">
                    <div className="hover:bg-gray-200 rounded-lg px-3 py-2 flex items-center mb-2 cursor-pointer">
                        <FaHome className="text-[#9C6317] mr-4" />
                        <span className="text-lg font-bold text-[#9C6317]">Home</span>
                    </div>
                    {/* Home childrens */}
                    <div className="pl-4 relative">
                        <div className="absolute top-0 h-full border-l-2 border-gray-300"></div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 border-t-2 border-gray-300 mr-3"></div>
                            <Link
                                to={'/popular'}
                                className="hover:bg-gray-100 hover:text-[#000000] cursor-pointer py-1 px-2 rounded-lg w-full text-gray-500 font-medium"
                            >
                                Trending
                            </Link>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 border-t-2 border-gray-300 mr-3"></div>
                            <span className="hover:bg-gray-100 hover:text-[#000000] cursor-pointer py-1 px-2 rounded-lg w-full text-gray-500 font-medium">
                                Learn JS
                            </span>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 border-t-2 border-gray-300 mr-3"></div>
                            <span className="hover:bg-gray-100 hover:text-[#000000] cursor-pointer py-1 px-2 rounded-lg w-full text-gray-500 font-medium">
                                About
                            </span>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 border-t-2 border-gray-300 mr-3"></div>
                            <span className="hover:bg-gray-100 hover:text-[#000000] cursor-pointer py-1 px-2 rounded-lg w-full text-gray-500 font-medium">
                                Contact us
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-64 pt-3 rounded-r-lg">
                {/* Dashboard parent */}
                <div className="pl-4 mb-4">
                    <div className="hover:bg-gray-200 rounded-lg px-3 py-2 flex items-center mb-2 cursor-pointer">
                        <MdDashboard className="text-[#9C6317] mr-4" />
                        <span className="text-lg font-bold text-[#9C6317]">Dashboard</span>
                    </div>
                    {/* Dashboard childrens */}
                    <div className="pl-4 relative">
                        <div className="absolute top-0 h-full border-l-2 border-gray-300"></div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 border-t-2 border-gray-300 mr-3"></div>
                            <Link
                                to={'/admin/project-dashboard'}
                                className="hover:bg-gray-100 hover:text-[#000000] cursor-pointer py-1 px-2 rounded-lg w-full text-gray-500 font-medium"
                            >
                                Projects
                            </Link>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 border-t-2 border-gray-300 mr-3"></div>
                            <span className="hover:bg-gray-100 hover:text-[#000000] cursor-pointer py-1 px-2 rounded-lg w-full text-gray-500 font-medium">
                                Users
                            </span>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 border-t-2 border-gray-300 mr-3"></div>
                            <span className="hover:bg-gray-100 hover:text-[#000000] cursor-pointer py-1 px-2 rounded-lg w-full text-gray-500 font-medium">
                                Comments
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarTreeView;
