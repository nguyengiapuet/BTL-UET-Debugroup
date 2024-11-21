import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import ProjectHeader from "./pen_components/PenHeader";
import { usePenData } from "./pen_components/PenData";
import CodeEditor from "./pen_components/CodeEditor";

function Pen() {
	const inputRef = useRef();
	const params = useParams();
	const [editTitle, setEditTitle] = useState(true);
	const { userData } = useContext(AuthContext);
	const { dataPen, handleOnchanePen, handleSavePens } = usePenData();

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
		</div>
	);
}

export default Pen;
