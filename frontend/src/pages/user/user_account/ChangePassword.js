import { useContext, useState } from "react";
import { FaCog, FaEdit } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

function ChangePassword() {
	const { userData, setUserData } = useContext(AuthContext);
	const [data, setData] = useState({
		email: userData.email,
		// avatar: null
	});
	return (
		<div className=" w-full h-[90vh] bg-slate-100 flex justify-center items-center flex-col gap-4">
			<div className="h-fit w-[75%] bg-slate-200 rounded-xl px-4 py-4">
				<div className="flex items-center gap-36">
					<div>
						<div className="text-3xl text-[#9C6317] font-medium">
							Your private info
						</div>
						<p className="w-[600px] text-lg text-[#505050]">
							Private info and options to manage it. You can make
							some of this private info.
						</p>
					</div>
					<FaCog className="text-8xl text-[#9C6317]" />
				</div>

				<div className="mt-12 flex flex-col gap-4">
					<div className="flex gap-8 items-center w-fit relative">
						<label className="text-[#505050] text-lg w-32">
							Email:
						</label>
						<input
							type="text"
							name="username"
							value={data.email}
							className="text-[#505050] text-lg outline-none w-72 px-2 py-1 rounded-lg"
							placeholder="UserA"
						/>
						<FaEdit className="absolute top-1 right-2 text-2xl cursor-pointer" />
					</div>
					<div className="flex gap-8 items-center w-fit relative">
						<label className="text-[#505050] text-lg w-32">
							Password:
						</label>
						<input
							type="password"
							name="username"
							value={"*******"}
							className="text-[#505050] text-lg outline-none w-72 px-2 py-1 rounded-lg"
							placeholder="UserA"
						/>
						<FaEdit className="absolute top-1 right-2 text-2xl cursor-pointer" />
					</div>
				</div>
				<button className="bg-[#7e158e] font-medium rounded-xl px-2 py-1 ml-40 mt-4 hover:bg-opacity-85 text-white">
					Save change
				</button>
			</div>
		</div>
	);
}

export default ChangePassword;
