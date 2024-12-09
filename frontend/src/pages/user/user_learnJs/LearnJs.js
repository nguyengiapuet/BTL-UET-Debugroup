import { Link } from "react-router-dom";
const LearnJs = () => {
	return (
		<div className="bg-purple-400 h-[700px] px-[300px] py-[100px] flex justify-center items-center">
			<div className="px-[50px] py-[50px] bg-slate-600 shadow-2xl  rounded-lg ">
				<h1>Hãy hoàn thành các bài kiểm tra về HTML CSS Javacript!</h1>
				<div className="flex gap-8 mt-6 justify-around">
					<Link
						to={"/game1"}
						className="px-10 py-3 bg-slate-400 rounded-lg transition-transform duration-200 hover:scale-105 hover:rounded-lg hover:bg-[#ccc]"
					>
						Lesson 1
					</Link>
					<Link
						to={"/game2"}
						className="px-10 py-3 bg-slate-400 rounded-lg transition-transform duration-200 hover:scale-105 hover:rounded-lg hover:bg-[#ccc]"
					>
						Lesson 2
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LearnJs;
