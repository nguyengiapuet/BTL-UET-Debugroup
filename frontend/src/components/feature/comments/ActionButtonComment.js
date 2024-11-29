import { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";

function ActionButtonComment({ comment, setRefreshComment, setEdit }) {
	const [openDialog, setOpenDialog] = useState(false);
	const { userData } = useContext(AuthContext);
	const ref = useRef();

	const handleDeleteComment = async () => {
		console.log("idComment, id_user" + comment.id + comment.id_user);

		try {
			const response = await axios.post(
				SummaryApi.deleteCommentByUser.url,
				{
					idComment: comment.id,
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setRefreshComment((prev) => !prev);
				setOpenDialog(false);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleEdit = () => {
		setEdit(true);
		setOpenDialog(false);
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setOpenDialog(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="flex items-center relative">
			<HiOutlineDotsHorizontal
				onClick={() => setOpenDialog(!openDialog)}
				className="text-3xl text-[#939393] cursor-pointer p-1 rounded-full hover:bg-[#e3fcfe]"
			/>
			{openDialog && comment.id_user === userData.id && (
				<div
					ref={ref}
					className="absolute z-[999] -bottom-14 -left-6 bg-gray-400 py-1 text-white rounded-lg"
				>
					<div
						onClick={handleDeleteComment}
						className="px-4 cursor-pointer hover:text-gray-500"
					>
						Delete
					</div>
					<hr />
					<div
						onClick={handleEdit}
						className="px-4 cursor-pointer hover:text-gray-500"
					>
						Edit
					</div>
				</div>
			)}
		</div>
	);
}

export default ActionButtonComment;
