import { javascript } from "@codemirror/lang-javascript";
import Exercise from "./Exercise";
import { PenQuestion } from "./PenQuestion";

function Game2() {
	const { dataPen, handleOnChangePen, setDataPen } = PenQuestion();
	return (
		<div className="w-[calc(100wh-20px)] max-h-[calc(100vh-60px)] min-h-[calc(100vh-60px)] flex flex-col">
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
