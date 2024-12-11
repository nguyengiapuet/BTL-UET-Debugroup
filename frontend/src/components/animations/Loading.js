import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import "./Loading.scss";

function Loading() {
	let [color, setColor] = useState("#ffff00");

	return (
		<div className="loading-animation">
			<HashLoader color={color} size={40} />
		</div>
	);
}

export default Loading;
