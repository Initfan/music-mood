import type { mood } from "../utils/types";

const Mood = ({
	setMood,
	currentMood,
}: {
	setMood: (mood: mood) => void;
	currentMood: mood;
}) => {
	const moods: mood[] = ["energik", "focus", "santai", "sedih", "senang"];

	return (
		<section>
			{moods.map((v, i) => (
				<button
					key={i}
					onClick={() => setMood(v)}
					disabled={v == currentMood}
				>
					{v}
				</button>
			))}
		</section>
	);
};

export default Mood;
