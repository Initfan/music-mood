import type { mood } from "../utils/types";

const Mood = ({ setMood }: { setMood: (mood: mood) => void }) => {
	const moods: mood[] = ["energik", "focus", "santai", "sedih", "senang"];

	return (
		<section>
			{moods.map((v, i) => (
				<button key={i} onClick={() => setMood(v)}>
					{v}
				</button>
			))}
		</section>
	);
};

export default Mood;
