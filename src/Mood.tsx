import { useState } from "react";
type mood = "focus" | "sedih" | "senang" | "energik" | "santai" | null;

const Mood = () => {
	const moods: mood[] = ["energik", "focus", "santai", "sedih", "senang"];
	const [currentMood, setCurrentMood] = useState<mood>(null);

	return (
		<section>
			{moods.map((v, i) => (
				<button key={i} onClick={() => setCurrentMood(v)}>
					{v}
				</button>
			))}
			{currentMood && (
				<p>
					Here's some music with <b>{currentMood}</b> mood
				</p>
			)}
		</section>
	);
};

export default Mood;
