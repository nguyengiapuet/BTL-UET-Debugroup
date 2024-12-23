import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import ProjectHeader from "./pen_components/PenHeader";
import { usePenData } from "./pen_components/PenData";
import CodeEditor from "./pen_components/CodeEditor";
import { MdArrowBack, MdError } from "react-icons/md";
import { ToastContainer } from "react-toastify";

function Pen() {
	const inputRef = useRef();
	const params = useParams();
	const [editTitle, setEditTitle] = useState(true);
	const { userData, setRedirectPath } = useContext(AuthContext);
	const { dataPen, setDataPen, handleOnchanePen, handleSavePens } =
		usePenData();
	const location = useLocation();
	var savedData = null;

	useEffect(() => {
		document.title = "Code editor";
	}, []);

	useEffect(() => {
		if (!userData.id) {
			setRedirectPath(location.pathname);
		}
		if (localStorage["savedDataPen"]) {
			savedData = JSON.parse(localStorage.getItem("savedDataPen"));
			localStorage.removeItem("savedDataPen");
		}
		setDataPen({
			...dataPen,
			...savedData,
		});
	}, []);

	if (
		dataPen.status === "private" &&
		(userData.email !== dataPen.email || !userData.id)
	) {
		return (
			<div className="flex flex-col items-center gap-4 justify-center h-screen  text-xl">
				<div className="text-3xl font-semibold flex items-center">
					<MdError className="size-14 text-red-600" />
					<h1>Not found pens: Status code 404</h1>
				</div>
				<Link
					to={"/"}
					className="text-sky-600 hover:bg-blue-200 bg-blue-100 rounded-md p-2 flex items-center justify-center"
				>
					<MdArrowBack className="size-8 mr-2" />
					Back to home
				</Link>
			</div>
		);
	}

	const handleEdit = () => {
		inputRef.current.disabled = false;
		inputRef.current.value = "";
		inputRef.current.focus();
		setEditTitle(false);
	};

	const handleKey = (e) => {
		if (e.key === "Enter") {
			inputRef.current.disabled = true;
			setEditTitle(true);
		}
	};

	const handleBlur = () => {
		inputRef.current.disabled = true;
		setEditTitle(true);
	};

	return (
		<div className="w-[calc(100wh-20px)] max-h-[calc(100vh-60px)] min-h-[calc(100vh-60px)] flex flex-col">
			<ProjectHeader
				editTitle={editTitle}
				handleEdit={handleEdit}
				handleBlur={handleBlur}
				handleKey={handleKey}
				handleSavePens={handleSavePens}
				handleOnchanePen={handleOnchanePen}
				userData={userData}
				params={params}
				dataPen={dataPen}
				inputRef={inputRef}
			/>

			<CodeEditor
				dataPen={dataPen}
				handleOnchanePen={handleOnchanePen}
				html={html}
				css={css}
				javascript={javascript}
			/>
			<ToastContainer
				className="mt-10"
				position="top-right"
				autoClose={2000}
			/>
		</div>
	);
}

export default Pen;
