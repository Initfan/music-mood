import { useState } from "react";
import Mood from "./components/Mood";
import Describe from "./components/Describe";
import type { mood } from "./utils/types";

const App = () => {
	const [isDescribe, setIsDescribe] = useState<boolean>(false);
	const [currentMood, setCurrentMood] = useState<mood | null>(null);

	return (
		<main>
			<h1>Find music that suit your mood</h1>
			{isDescribe ? (
				<Describe setMood={(mood) => setCurrentMood(mood)} />
			) : (
				<Mood setMood={(mood) => setCurrentMood(mood)} />
			)}
			<button onClick={() => setIsDescribe((p) => !p)}>
				{isDescribe ? "Pick mood" : "Desribe what i feel"}
			</button>
			{currentMood && (
				<>
					<h5>it looks like you are {currentMood}</h5>
					<p>
						Here's some music with <b>{currentMood}</b> mood
					</p>
				</>
			)}
		</main>
	);
};

export default App;
