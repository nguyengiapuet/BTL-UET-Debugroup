/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaBicycle, FaComment, FaEdit, FaHeart, FaRecycle, FaRegHeart, FaRemoveFormat, FaStar, FaTrash, FaUserCircle } from "react-icons/fa";
import SummaryApi from "../common";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Comments from "../components/Comments";
import { AuthContext } from "../context/AuthContext";


function MyProject() {
    const { sortLike } = useOutletContext();

    const [getAllPens, setGetAllPens] = useState([])
    const [totalLike, setTotalLike] = useState({});
    const [allLike, setAllLike] = useState([]);
    const [totalComment, setTotalComment] = useState({})
    const [openComment, setOpenComment] = useState(false)
    const [project, setProject] = useState('')
    const { userData } = useContext(AuthContext)

    console.log("userData", userData.username);
    

    const navigate = useNavigate()

    const fetchGetAllPens = async () => {
        try {
            const response = await axios.post(SummaryApi.getAllPens.url, {
                username: userData.username
            })

            if (response.data.success) {
                console.log(response.data.data);
                if (sortLike) {
                    setGetAllPens(sortLike(response.data.data));
                } else {
                    setGetAllPens(response.data.data);
                }
            }
        } catch (err) {
            console.log(err.message);
            return;
        }
    }

    const totalLikes = async () => {
        try {
            const response = await axios.get(SummaryApi.totalLike.url);

            if (response.data.success) {
                for(let i = 0; i < response.data.data.length; i++) {
                    setTotalLike(prev => ({...prev, [response.data.data[i].id_project]: response.data.data[i].total_likes}))
                }
            }
        } catch (err) {
            console.log(err.message);
            
        }
    }

    const handleLike = async (pen) => {
        try {
            const response = await axios.post(SummaryApi.addLike.url, {
                idProject: pen.id,
            });

            if (response.data.success) {
                toast.success("Like added successfully!");
                getAllLikeByUser()
                setTotalLike(prev => ({...prev, [pen.id]: prev[pen.id] ? prev[pen.id]  + 1 : 1}))


            }
        } catch (err) {
            console.log(err.message);
            return;
        }
    };

    const handleUnlike = async (pen) => {
        try {
            const response = await axios.post(SummaryApi.deleteLike.url, {
                idProject: pen.id,
            });

            if (response.data.success) {
                toast.success("Like removed successfully!");
                getAllLikeByUser()
                setTotalLike(prev => ({...prev, [pen.id]: prev[pen.id] ? prev[pen.id]  - 1 : 0}))
            }
        } catch (err) {
            console.log(err.message);
            return;
        }
    };

    const getAllLikeByUser = async () => {
        try {
            const response = await axios.get(SummaryApi.getAllLikeByUser.url);
            if (response.data.success) {
                setAllLike(response.data.data);
                console.log("response.data.data", response.data.data);
            }
        } catch (err) {
            console.log(err.message);
            return;
        }
    };

    const handleRemove = async (pen) => {
        try {
            const response = await axios.delete(`${SummaryApi.deletePens.url}/${pen.id}`)

            if(response.data.success) {
                toast.success(response.data.message)
                fetchGetAllPens()
            }
        } catch (err) {
            console.log(err.message);
            
        }
    }

    const handleClickPens = (pen) => {
        navigate(`/pen/${pen.id}`)
    }

    const totalComments = async () => {
        try {
            const response = await axios.get(SummaryApi.totalComments.url)
            if (response.data.success) {
                console.log("response.data.data????", response.data.data);
                for (let i = 0; i < response.data.data.length; i++) {
                    setTotalComment(prev => ({...prev, [response.data.data[i].id_project]: response.data.data[i].total_comments}))
                }
            }
        } catch (err) {
            console.log(err.message);
            
        }

    } 

    const handleOpenComment = (pen) => {
        setOpenComment(true)
        setProject(pen)

    }

    useEffect(() => {
        fetchGetAllPens();
        getAllLikeByUser();
        totalLikes();
        totalComments()
    }, [sortLike])

    return (
        <div className=" w-full h-fit py-4 pb-32">
            <div className="flex flex-wrap justify-between gap-y-8 h-fit">
                {
                    getAllPens.length!==0 && getAllPens.map((pen, index) => (
                        <div key={index} className="bg-white w-[480px] rounded-3xl h-[400px] flex flex-col items-center gap-4 px-4 py-2 shadow-md">

                            <div className="flex h-20 items-center justify-between w-full">
                                {
                                    pen.avatar ? (
                                        <img
                                            className="w-[48px] h-[48px] rounded-full border border-[#c9c9c9]"
                                            src={pen.avatar}
                                            alt="avatar"
                                        />
                                    ) : (
                                        <FaUserCircle className="text-5xl text-[#acacac]" />
                                    )
                                }
                                <h1 className="text-2xl text-[#9C6317] font-semibold">{pen.title}</h1>
                                
                                <div className="flex gap-2">
                                    <div onClick={() => handleClickPens(pen)}>
                                        <FaEdit className="text-[32px] cursor-pointer text-[#E9B500]" />
                                    </div>

                                    <div onClick={() => handleRemove(pen)}>
                                        <FaTrash className="text-[32px] cursor-pointer text-[#E9B500]" />
                                    </div>
                                </div>


                            </div>
                            <iframe className="w-full h-full rounded-2xl overflow-x-hidden overflow-y-auto" srcDoc={pen.output}/>
                            
                            <div className="w-full flex pt-4">
                                <div className="px-3 py-1 ml-2 bg-[#cfcfcf] w-fit rounded-xl flex gap-1 items-center justify-center">
                                    <p className="text-[#545454] text-xl">
                                        {
                                            totalLike[pen.id] ? totalLike[pen.id] : 0
                                        }
                                    </p>
                                    {allLike.find(
                                        (project) => project.id_project === pen.id
                                    ) ? (
                                        <FaHeart
                                            onClick={() => handleUnlike(pen)}
                                            className="text-[24px] cursor-pointer text-[#ff3434]"
                                        />
                                    ) : (
                                        <FaRegHeart
                                            onClick={() => handleLike(pen)}
                                            className="text-[24px] cursor-pointer text-[#545454]"
                                        />
                                    )}
                                </div>
                                <div className="px-3 py-1 ml-2 bg-[#cfcfcf] w-fit rounded-xl flex gap-1 items-center justify-center">
                                    <p className="text-[#545454] text-xl">{totalComment[pen.id] ? totalComment[pen.id] : 0}</p>
                                    
                                        <FaComment
                                            onClick={() => handleOpenComment(pen)}
                                            className="text-[24px] cursor-pointer text-[#545454] hover:opacity-80"
                                        />
                                </div>
                            </div>
                        </div>
                    ))
                }
                    {
                        openComment && <Comments setOpen={setOpenComment} project={project}/>
                    }
            </div>
        </div>
    );
}

export default MyProject;
