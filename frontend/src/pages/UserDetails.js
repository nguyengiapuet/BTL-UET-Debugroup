import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { useEffect, useState } from "react";
import { MdAdd, MdWork } from "react-icons/md";
import { FaComment, FaEdit, FaEye, FaHeart, FaRegHeart, FaTrash, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Comments from "../components/Comments";


function UserDetails() {
    const params = useParams()
    const [dataUser, setDataUser] = useState({
        username: '',
        avatar: '',
        email: '',
        bio: '',
        followers: 0,
        following: 0,
        projects: 0,
        totalLikes: 0,
        totalComments: 0,
        totalFollowers: 0,
        totalFollowing: 0,
        totalProjects: 0
    })

    const [projectsUser, setProjectsUser] = useState([])

    const [totalLike, setTotalLike] = useState({});
    const [allLike, setAllLike] = useState([]);
    const [totalComment, setTotalComment] = useState({})
    const [openComment, setOpenComment] = useState(false)
    const [project, setProject] = useState('')


    const navigate = useNavigate()


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


    const fetchUserProjects = async () => {
        try {
            const response = await axios.post(SummaryApi.getAllPens.url, {
                username: params.username 
            })

            if(response.data.success) {
                setProjectsUser(response.data.data);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${SummaryApi.detailUserOther.url}/${params.username}`)

            if(response.data.success) {
                console.log(response.data.data);
                setDataUser({ ...dataUser, ...response.data.data});
            }
        } catch(err) {
            console.log(err.message);
            
        }
    }

    useEffect(() => {
        fetchUserDetails();
        fetchUserProjects()
        totalLikes();
        totalComments();
        getAllLikeByUser()
    }, [])

    return (  
        <div className="bg-slate-200 w-full h-[100vh] overflow-y-scroll pb-20">
            <div className="flex flex-col p-6 items-center">
                <div className="w-full">
                    <img alt="" className="object-cover h-64 w-full rounded-lg" src='https://img.freepik.com/free-vector/copy-space-bokeh-spring-lights-background_52683-55649.jpg'/>
                    <img alt="" className="object-cover h-32 w-32 rounded-full bottom-16 relative mx-auto ring-4 ring-white" src={dataUser.avatar}/>
                </div>

                <div className="-mt-12">
                    <span className="text-3xl font-medium">{dataUser.username}</span>
                </div>

                <div className="flex gap-6 items-center mt-2">
                    <span className="font-medium text-lg flex gap-1 items-center">
                        {dataUser.followers}  
                        <span className="text-gray-500 text-lg font-normal">
                            Followers
                        </span>
                    </span>
                    <span className="font-medium text-lg flex gap-1 items-center">
                        {dataUser.following}
                        <span className="text-gray-500 text-lg font-normal">
                            Following
                        </span>
                    </span>
                    <button className="px-2 py-1 bg-green-500 rounded-md hover:bg-green-600 hover:text-white flex items-center gap-1">
                        <MdAdd />
                        Follow
                    </button>
                </div>

                {/* List project */}
                <div className="flex flex-wrap justify-between gap-y-8 h-fit mt-10 w-[55vw]">
                {
                    projectsUser.length!==0 && projectsUser.map((pen, index) => (
                        <div key={index} className="bg-white w-[25vw] rounded-3xl h-[400px] flex flex-col items-center gap-4 px-4 py-2 shadow-md">

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
                                        <FaEye className="text-[32px] cursor-pointer text-[#E9B500]" />
                                    </div>
                                </div>


                            </div>
                            <iframe title={pen.title} className="w-full h-full rounded-2xl overflow-x-hidden overflow-y-auto" srcDoc={pen.output}/>
                            
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
        </div>
    );
}

export default UserDetails;