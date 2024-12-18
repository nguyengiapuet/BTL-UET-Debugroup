import axios from "axios";
import javascriptDemo from "../../asset/javascript_demo.webm";
import fastLiveView from "../../asset/live_code.webm";
import SummaryApi from "../../common";
import ReviewCard from "./components/ReviewCard";
import { message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function AboutUs() {
	const [reviews, setReviews] = useState([]);

	const getAllReview = async () => {
		try {
			const response = await axios.get(SummaryApi.getAllReview.url);
			if (response.data.success) {
				setReviews(response.data.data);
				return response.data.data;
			}
		} catch (err) {
			console.log(err.message);
			message.error(err.message);
		}
	};
	useEffect(() => {
		getAllReview();
	}, []);

	useEffect(() => {
		document.title = "About us";
	}, []);

	return (
		<div className="h-screen overflow-y-auto">
			{/* Top section */}
			<div className="mt-10 flex flex-col gap-2 text-center items-center">
				<div className="text-[40px] font-bold">
					Javascript Playground
				</div>
				<div className="text-sm text-gray-600">by DEBUG team.</div>
				<div className="flex flex-row gap-6 text-2xl my-5 font-bold">
					<div className="text-[#9C6317]">Code</div>
					<div className="text-[#eb5757]">Learn</div>
					<div className="text-sky-500">Easy & Fast</div>
				</div>
				<div className="max-w-[550px]">
					The #1 JavaScript playground and sandbox to write, run and
					repl it. JavaScript playground is perfect for learning and
					prototyping javascript sandboxes. Fast. Easy to use. Start
					javascript playground project using ready to use templates.
				</div>
				<div className="flex flex-row gap-8">
					<Link
						to={"/pen"}
						className="w-fit h-fit min-h-[44px] flex items-center mt-5 bg-[#58a51b] rounded-md px-10 py-2 text-sm text-white font-bold hover:bg-[#58a51b]/80"
					>
						START CODING
					</Link>
					<Link
						to={"/learn"}
						className="w-fit h-fit min-h-[44px] flex items-center mt-5 bg-white border-2 border-[#7e3b41] rounded-md px-10 py-2 text-sm text-[#eb5757] font-bold hover:text-white hover:bg-[#7e3b41]"
					>
						START LEARNING
					</Link>
				</div>
				<div>
					<video
						className="w-full max-w-[800px] mt-8 rounded-lg shadow-lg"
						autoPlay
						loop
						muted
					>
						<source src={javascriptDemo} type="video/webm" />
					</video>
				</div>
			</div>
			{/* Middle section */}
			<div className="w-full h-fit bg-indigo-100 mt-10">
				<div className="m-auto my-10 pb-10 pt-5 flex flex-col gap-5 justify-center items-center max-w-[700px]">
					<div className="text-[28px] font-bold">
						Why JavaScript Playground?
					</div>
					<div className="text-left flex flex-col gap-2 text-sm">
						<div>
							Learning, practicing and prototyping is much easier
							right in the javascript playground, because the
							browser is designed to run javascript. This is the
							perfect coding IDE.
						</div>
						<div>
							In turn, PlayCode tries to use all the browser
							features to ensure maximum, comfortable run
							javascript sandbox. REPL - read-eval-print-loop,
							simple preconfigured coding environment which
							quickly shows javascript execution result. Just type
							your code and repl it. No configs or "npm install".
						</div>
						<div>
							So, you just open PlayCode without installing
							anything, write code, javascript playground runs
							your code instantly and shows the result. Focus on
							learning javascript and practicing.
						</div>
					</div>
				</div>
			</div>
			{/* Bottom section */}
			<div className="m-auto my-10 pb-10 pt-5 flex flex-col gap-5 justify-center items-center max-w-[700px]">
				<div className="text-[28px] font-bold">
					The Fastest Live View
				</div>
				<div className="text-sm text-center">
					See results as you type, instantly. Speed-up learning and
					code debugging. PlayCode is the fastest coding experience
					ever.
				</div>
				<div>
					<video
						className="w-full max-w-[800px] mt-8 rounded-lg shadow-lg"
						autoPlay
						loop
						muted
					>
						<source src={fastLiveView} type="video/webm" />
					</video>
				</div>
			</div>

			<div className="w-full bg-indigo-100 mt-10 min-h-screen">
				<div className="m-auto mt-10 pb-10 pt-5 flex flex-col gap-5 justify-center items-center max-w-[700px]">
					<div className="text-3xl font-bold">Reviews app</div>
				</div>
				<div className="container mx-auto p-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{reviews.length === 0 ? (
							<div className="text-center">
								Waiting get reviews...
							</div>
						) : (
							reviews.map((item, index) => (
								<ReviewCard data={item} key={index} />
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutUs;
