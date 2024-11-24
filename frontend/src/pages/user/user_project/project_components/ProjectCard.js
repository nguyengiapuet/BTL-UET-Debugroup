import { Link } from "react-router-dom";
import ButtonLike from "../../../../components/feature/likes/ButtonLike";
import ButtonComment from "../../../../components/feature/comments/ButtonComment";
function ProjectCard({ pen, userData, sortLike }) {
	return (
		<div className="flex flex-col w-[calc(33.33%-20px)] bg-slate-200 rounded-xl shadow-md">
			<div className="bg-white w-full rounded-xl h-[215px] flex flex-col items-center gap-4 shadow-md relative group">
				{/* Preview */}
				<Link className="w-full h-full rounded-xl overflow-x-hidden overflow-y-auto">
					<iframe className="w-full h-full" srcDoc={pen.output} />
				</Link>
				<div
					className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                    flex gap-4 items-center justify-center transition-all duration-300 rounded-xl"
				>
					<ActionButton
						to={`/project-detail/${pen.id}`}
						label="Project detail"
					/>
					<ActionButton
						to={`/pen/${pen.id}`}
						label="View source"
						target="blank"
					/>
				</div>
			</div>
			<CardFooter pen={pen} userData={userData} sortLike={sortLike} />
		</div>
	);
}

const ActionButton = ({ to, label, target }) => (
	<Link
		to={to}
		target={target}
		className="px-5 py-[6px] bg-[#9C6317] text-white font-medium rounded-lg
            transform translate-y-4 group-hover:translate-y-0 transition-all duration-300
            hover:bg-sky-500 hover:text-white text-sm"
	>
		{label}
	</Link>
);

const CardFooter = ({ pen, userData, sortLike }) => (
	<div className="w-full py-2 px-2 flex flex-row justify-between items-center text-sm">
		<div className="flex flex-col">
			<Link target="blank" className="font-semibold">
				{pen.title}
			</Link>
			<div>
				by{" "}
				<Link
					to={`/info/${pen.username}`}
					className="hover:underline font-medium"
				>
					{pen.username}
				</Link>
			</div>
		</div>
		<div className="flex flex-row gap-4">
			<ButtonLike pen={pen} sortLike={sortLike} />
			<ButtonComment pen={pen} />
		</div>
	</div>
);

export default ProjectCard;
