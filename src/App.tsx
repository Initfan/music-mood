import { useState } from "react";
import Mood from "./components/Mood";
import Describe from "./components/Describe";

const App = () => {
	const [isDescribe, setIsDescribe] = useState<boolean>(false);
	return (
		<div>
			<h1>Find music that suit your mood</h1>
			{isDescribe ? <Describe /> : <Mood />}
			<button onClick={() => setIsDescribe((p) => !p)}>
				{isDescribe ? "Pick mood" : "Desribe what i feel"}
			</button>
		</div>
	);
};

export default App;
