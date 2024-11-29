import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { FaChevronDown, FaCog } from "react-icons/fa";
function EditorPane({
	icon: Icon,
	title,
	language,
	value,
	onChange,
	extension,
}) {
	return (
		<div className="h-full w-full relative bg-[#e5e7eb] pt-0">
			<div className="flex justify-between bg-gray-400 absolute w-full">
				<div className="flex items-center px-2 bg-[#282a36] gap-1">
					<Icon
						className={`text-xl ${
							title === "HTML"
								? "text-red-600"
								: title === "CSS"
								? "text-blue-600"
								: "text-yellow-500"
						}`}
					/>
					<div className="text-sm py-1 font-medium text-white">
						{title}
					</div>
				</div>
				<div className="flex gap-2 items-center px-2">
					<FaCog className="text-base" />
					<FaChevronDown className="text-base" />
				</div>
			</div>
			<CodeMirror
				value={value}
				height="100%"
				theme={dracula}
				extensions={[extension()]}
				onChange={(value) => onChange(value, language.toLowerCase())}
				style={{
					backgroundColor: "#282a36",
				}}
				className="py-8 h-full"
			/>
		</div>
	);
}

export default EditorPane;
