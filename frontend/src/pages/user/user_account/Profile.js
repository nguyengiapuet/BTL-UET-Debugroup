import { useContext, useEffect, useState } from "react";
import { FaCog, FaEdit, FaRegTrashAlt, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";

function Profile() {
	const { userData, setUserData } = useContext(AuthContext);
	const [data, setData] = useState({
		username: userData.username,
		avatar: userData.avatar,
		// avatar: null
	});

	console.log("data>>>/", data.username);

	const handleUploadPic = async (e) => {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.readAsDataURL(file);

		const dataImg = await new Promise((resolve, reject) => {
			reader.onload = () => resolve(reader.result);

			reader.onerror = (error) => reject(error);
		});

		console.log("dataImg", dataImg);

		setData({ ...data, avatar: dataImg });
	};

	const handleUpdateProfile = async () => {
		try {
			const response = await axios.put(
				`${SummaryApi.updateProfile.url}/${userData.id}`,
				{
					username: data.username,
					avatar: data.avatar,
					// avatar: dataImg
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setUserData({
					...userData,
					username: data.username,
					avatar: data.avatar,
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const changeProfile = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (userData) {
			setData({
				username: userData.username,
				avatar: userData.avatar,
			});
		}
	}, [userData]);
	return (
		<div className=" w-full h-[90vh] bg-slate-100 flex justify-center items-center flex-col gap-4">
			<div className="h-fit w-[75%] bg-slate-200 rounded-xl px-4 py-4">
				<div className="flex items-center gap-36">
					<div>
						<div className="text-3xl text-[#9C6317] font-medium">
							Your profile info
						</div>
						<p className="w-[600px] text-lg text-[#505050]">
							Personal info and options to manage it. You can make
							some of this basic info, like your contact details,
							visible to others so they can reach you easily.
						</p>
					</div>
					<FaCog className="text-8xl text-[#9C6317]" />
				</div>

				<div className="mt-12 flex flex-col gap-4">
					<div className="flex gap-8 items-center">
						<label className="text-[#505050] text-lg w-32">
							Profile picture
						</label>
						<div className="text-[#505050] text-lg">
							Add a profile picture to your account
						</div>
						<div className="w-16 h-16 relative rounded-full bg-slate-200 overflow-hidden">
							<div>
								{data.avatar ? (
									<img src={data.avatar} alt="Login icon" />
								) : (
									<FaUserCircle className="w-full h-full text-center text-5xl text-[#6f6f6f]" />
								)}
							</div>
							<label>
								<div className=" text-center w-full text-xs pb-2 absolute bottom-0 text-slate-800 bg-slate-100 bg-opacity-60 cursor-pointer">
									Change avatar
								</div>
								<input
									type="file"
									className="hidden"
									onChange={handleUploadPic}
								/>
							</label>
						</div>
					</div>
					<div className="flex gap-8 items-center w-fit relative">
						<label className="text-[#505050] text-lg w-32">
							Name:
						</label>
						<input
							type="text"
							name="username"
							value={data.username}
							onChange={changeProfile}
							className="text-[#505050] text-lg outline-none w-72 px-2 py-1 rounded-lg"
							placeholder="UserA"
						/>
						<FaEdit className="absolute top-1 right-2 text-2xl cursor-pointer" />
					</div>
					<div className="flex gap-8 items-center">
						<label className="text-[#505050] text-lg w-32">
							Gender
						</label>
						<div>
							<input
								className=""
								name="gender"
								value={"male"}
								type="radio"
							/>
							<label className="ml-2 text-lg text-[#505050]">
								Male
							</label>
						</div>
						<div>
							<input
								className=""
								name="gender"
								value={"female"}
								type="radio"
							/>
							<label className="ml-2 text-lg text-[#505050]">
								Female
							</label>
						</div>
					</div>
				</div>
				<button
					onClick={handleUpdateProfile}
					className="bg-[#7e158e] font-medium rounded-xl px-2 py-1 ml-40 mt-4 hover:bg-opacity-85 text-white"
				>
					Save change
				</button>
			</div>

			<div className="bg-slate-200 w-[75%] h-36 rounded-xl pl-4">
				<div className="flex justify-between gap-10">
					<div>
						<div className="text-3xl mt-2 text-[#9C6317] font-medium">
							Danger
						</div>
						<p className="w-[600px] text-lg text-[#505050]">
							Deleting your account will wipe all infomation about
							you and content you have created
						</p>
					</div>

					<div className="bg-[#979797] w-full h-36 rounded-tr-xl rounded-br-xl flex items-center justify-center">
						<div className="bg-[#9C6317] flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-opacity-85">
							<FaRegTrashAlt className="text-3xl text-white" />
							<button className="text-white font-semibold text-2xl">
								DELETE
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
