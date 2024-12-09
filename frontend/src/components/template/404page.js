import { MdArrowBack, MdError } from "react-icons/md";
import { Link } from "react-router-dom";

function PageNotFound() {
	return (
		<div className="flex flex-col items-center gap-6 justify-center h-screen text-xl bg-gray-100">
			<div className="text-4xl font-bold flex items-center text-red-600">
				<MdError className="size-14 mr-2" />
				<h1>Oops! Page Not Found (404)</h1>
			</div>
			<p className="text-lg text-gray-700 mb-4">
				The pen you are looking for does not exist or in private.
			</p>
			<Link
				to={"/"}
				className="text-white text-md bg-blue-500 hover:bg-blue-600 rounded-md p-2 flex items-center justify-center transition duration-300 ease-in-out shadow-lg"
			>
				<MdArrowBack className="size-4 mr-1" />
				Back to Home
			</Link>
		</div>
	);
}

export default PageNotFound;
