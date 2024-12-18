import { useEffect } from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const LearnJs = () => {
	useEffect(() => {
		document.title = "Learn JS";
	}, []);
	return (
		<div className="px-5 min-h-screen flex justify-center items-center py-10">
			<div className="flex flex-col gap-5 md:flex-row justify-between w-full max-w-6xl overflow-hidden">
				{/* Left Side - Lesson 1 */}
				<div className="min-h-[500px] p-8 md:w-1/2 bg-gradient-to-r from-blue-100 to-gray-200 rounded-3xl flex flex-col items-center justify-between">
					<div className="flex items-center mb-6">
						<h2 className="text-3xl font-extrabold text-gray-800">
							Lesson 1: Theory about HTML
						</h2>
					</div>

					<p className="text-gray-700 mb-6 text-center">
						In this lesson, you will learn the basics of HTML, the
						standard markup language for creating web pages. We will
						cover the structure of an HTML document, common tags,
						and how to create a simple webpage.
					</p>

					<ul className="list-disc list-inside mb-6 space-y-2 text-gray-600">
						<li className="flex items-center justify-start gap-2">
							<FaCheckCircle className="text-sky-500" />
							Understanding HTML structure
						</li>
						<li className="flex items-center justify-start gap-2">
							<FaCheckCircle className="text-sky-500" />
							Common HTML tags
						</li>
						<li className="flex items-center justify-start gap-2">
							<FaCheckCircle className="text-sky-500" />
							Creating links and images
						</li>
						<li className="flex items-center justify-start gap-2">
							<FaCheckCircle className="text-sky-500" />
							Building a simple webpage
						</li>
					</ul>

					<Link
						to={"/game1"}
						className="bg-blue-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 flex items-center"
					>
						Start Lesson 1
					</Link>
				</div>

				{/* Right Side - Lesson 2 */}
				<div className="min-h-[500px] p-8 md:w-1/2 bg-gradient-to-r from-sky-100 to-teal-200 rounded-3xl flex flex-col items-center justify-between">
					<div className="flex items-center mb-6">
						<h2 className="text-3xl font-extrabold text-gray-800">
							Lesson 2: Practice Exercises
						</h2>
					</div>

					<p className="text-gray-700 mb-6 text-center">
						In this lesson, you will learn how to style your HTML
						documents using CSS. We will cover selectors,
						properties, and how to create visually appealing web
						pages.
					</p>

					<ul className="list-disc list-inside mb-6 space-y-2 text-gray-600">
						<li className="flex items-center justify-start gap-2">
							<FaCheckCircle className="text-sky-500" />
							Understanding CSS syntax
						</li>
						<li className="flex items-center justify-start gap-2">
							<FaCheckCircle className="text-sky-500" />
							Applying styles to HTML elements
						</li>
						<li className="flex items-center justify-start gap-2">
							<FaCheckCircle className="text-sky-500" />
							Using classes and IDs
						</li>
						<li className="flex items-center justify-start gap-2">
							<FaCheckCircle className="text-sky-500" />
							Creating responsive designs
						</li>
					</ul>

					<Link
						to={"/game2"}
						className="bg-teal-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-teal-600 hover:shadow-lg transition duration-300 flex items-center"
					>
						Start Lesson 2
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LearnJs;
