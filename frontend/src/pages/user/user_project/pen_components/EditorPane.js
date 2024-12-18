import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { FaMagic } from "react-icons/fa";
import beautify from "js-beautify";

function EditorPane({
	icon: Icon,
	title,
	language,
	value,
	onChange,
	extension,
}) {
	const formatCode = () => {
		let formattedCode;

		try {
			console.log("Formatting code...");
			console.log("Current language:", language);
			console.log("Current value:", value);

			if (language === "HTML") {
				formattedCode = beautify.html(value, {
					indent_size: 2,
					indent_char: " ",
				});
			} else if (language === "CSS") {
				formattedCode = beautify.css(value, {
					indent: "  ",
					openbrace: "separate",
					autosemicolon: true,
				});
			} else if (language === "JS") {
				formattedCode = beautify.js(value, {
					indent_size: 2,
					space_in_empty_paren: true,
				});
			}

			onChange(formattedCode, language.toLowerCase());
		} catch (error) {
			console.error("Formatting error:", error);
		}
	};

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
					<button
						onClick={formatCode}
						className="text-base flex items-center"
					>
						<FaMagic className="mr-1" />
						Format Code
					</button>
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
