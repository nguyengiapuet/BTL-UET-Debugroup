import SplitPane from "react-split-pane";
import { FaHtml5, FaCss3, FaJs } from "react-icons/fa";
import EditorPane from "./EditorPane";

function CodeEditor({ dataPen, handleOnchanePen, html, css, javascript }) {
	const splitPaneStyle = {
		width: "6px",
		backgroundColor: "#9ca3af",
		border: "none",
		margin: "0",
		opacity: "unset",
	};

	return (
		<div className="bg-[#9ca3af]">
			<SplitPane
				split="horizontal"
				minSize={100}
				maxSize={-100}
				defaultSize="50%"
				resizerStyle={{
					...splitPaneStyle,
					height: "6px",
					width: "100%",
				}}
			>
				<SplitPane
					split="vertical"
					minSize={100}
					maxSize={-100}
					defaultSize="30%"
					resizerStyle={splitPaneStyle}
				>
					<EditorPane
						icon={FaHtml5}
						title="HTML"
						language="HTML"
						value={dataPen.html}
						onChange={handleOnchanePen}
						extension={html}
					/>

					<SplitPane
						split="vertical"
						minSize={100}
						maxSize={-100}
						defaultSize="50%"
						resizerStyle={splitPaneStyle}
					>
						<EditorPane
							icon={FaCss3}
							title="CSS"
							language="CSS"
							value={dataPen.css}
							onChange={handleOnchanePen}
							extension={css}
						/>

						<EditorPane
							icon={FaJs}
							title="JS"
							language="JS"
							value={dataPen.js}
							onChange={handleOnchanePen}
							extension={javascript}
						/>
					</SplitPane>
				</SplitPane>

				<SplitPane
					split="vertical"
					minSize={100}
					maxSize={-100}
					defaultSize="50%"
					resizerStyle={splitPaneStyle}
				>
					<div className="w-full h-full bg-[#15222e] border-2 border-black flex flex-col">
						<div className="flex justify-between bg-gray-400 absolute w-full">
							<div className="text-sm py-1 px-3 font-medium text-white bg-[#15222e]">
								Webview
							</div>
						</div>
						<iframe
							srcDoc={dataPen.output}
							className="text-white w-full h-full py-4"
						/>
					</div>
					<div className="w-full h-full bg-[#15222e] border-2 border-black overflow-auto flex flex-col">
						<div className="flex justify-between bg-gray-400 w-full">
							<div className="text-sm py-1 px-3 font-medium text-white bg-[#15222e]">
								Console
							</div>
						</div>
						<div className="text-white font-mono whitespace-pre p-4">
							{(() => {
								const logs = [];
								const originalConsole = window.console;
								window.console = {
									log: (...args) => {
										logs.push(`=> ${args.join(" ")}`);
										originalConsole.log(...args);
									},
									error: (...args) => {
										logs.push(`Error: ${args.join(" ")}`);
										originalConsole.error(...args);
									},
								};

								try {
									eval(dataPen.js);
								} catch (err) {
									logs.push(`Error: ${err.message}`);
								}
								window.console = originalConsole;
								return logs.join("\n");
							})()}
						</div>
					</div>
				</SplitPane>
			</SplitPane>
		</div>
	);
}

export default CodeEditor;
