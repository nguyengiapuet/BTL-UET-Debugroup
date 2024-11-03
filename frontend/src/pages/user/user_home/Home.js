import { useContext, useEffect, useState } from 'react';
import { FaCodeBranch, FaFire, FaRegArrowAltCircleUp, FaSortAlphaDown } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

function Home() {
    const [active, setActive] = useState('popular');
    const [sort, setSort] = useState(false);
    const { setTitle } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClickTitle = (e) => {
        setActive(e.target.textContent.toLowerCase());
        setTitle(e.target.textContent);
    };

    const sortLike = (listProject) => {
        const a = listProject.sort((a, b) => b.total_likes - a.total_likes);

        return a;
    };

    useEffect(() => {
        navigate('/popular');
    }, []);

    return (
        <div className="w-full h-screen bg-[#eff2f7] overflow-auto overflow-y-scroll">
            <div className=" w-full h-full flex items-center flex-col bg-[#eff2f7]">
                <div className="flex h-full w-[1080px] mt-24 flex-col gap-6">
                    <div className="flex justify-between w-full border-b border-[#aaa] pb-4">
                        <div className="flex gap-4 items-center">
                            <Link
                                onClick={handleClickTitle}
                                to={'/popular'}
                                className={
                                    `${active === 'popular' ? 'bg-[#9c6317]' : 'bg-[#7a7a7a]'} ` +
                                    'flex items-center gap-1 rounded-full font-medium py-1 px-4 text-white cursor-pointer text-md '
                                }
                            >
                                <FaFire className="text-[#ff702e] text-xl" />
                                Popular
                            </Link>
                            <Link
                                onClick={handleClickTitle}
                                to={'/upvoted'}
                                className={
                                    `${active === 'upvoted' ? 'bg-[#9c6317]' : 'bg-[#7a7a7a]'} ` +
                                    'flex items-center gap-1 rounded-full font-medium py-1 px-4 text-white cursor-pointer text-md '
                                }
                            >
                                <FaRegArrowAltCircleUp className="text-[#35ff2e] text-xl" />
                                Upvoted
                            </Link>
                            <Link
                                onClick={handleClickTitle}
                                to={'/myproject'}
                                className={
                                    `${active === 'my projects' ? 'bg-[#9c6317]' : 'bg-[#7a7a7a]'} ` +
                                    'flex items-center gap-1 rounded-full font-medium py-1 px-4 text-white cursor-pointer text-md '
                                }
                            >
                                <FaCodeBranch className="text-[#2ecbff] text-xl" />
                                My projects
                            </Link>
                        </div>
                        <div
                            onClick={() => setSort(!sort)}
                            className="hover:bg-[#626262] hover:text-white border-2 border-slate-400 py-1 px-8 cursor-pointer rounded-full font-medium text-[#626262] text-md gap-2 flex items-center"
                        >
                            <FaSortAlphaDown />
                            <p>Sort</p>
                        </div>
                    </div>

                    <Outlet context={sort ? { sortLike } : { sortLike: null }} />
                </div>
            </div>

            <Link
                to={'/pen'}
                className="fixed h-12 w-48 font-semibold cursor-pointer hover:bg-opacity-80 shadow-md flex items-center justify-center bg-[#9C6317] text-xl rounded-full text-white bottom-10 right-[680px]"
            >
                Start coding
            </Link>
        </div>
    );
}

export default Home;
