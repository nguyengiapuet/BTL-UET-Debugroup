import { javascript } from "@codemirror/lang-javascript";
import Exercise from "./Exercise";
import { PenQuestion } from "./PenQuestion";

function Game2() {
	const { dataPen, handleOnChangePen, setDataPen } = PenQuestion();
	return (
		<div className="w-full h-full">
			<Exercise
				dataPen={dataPen}
				handleOnChangePen={handleOnChangePen}
				javascript={javascript}
				setDataPen={setDataPen}
			/>
		</div>
	);
}

export default Game2;
