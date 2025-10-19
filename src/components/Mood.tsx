import type { mood } from "../utils/types";

const Mood = ({ setMood }: { setMood: (mood: mood) => void }) => {
	const moods: mood[] = ["fokus", "santai", "sedih", "senang"];

	const onSelectedMood = (mood: mood) => {
		const totalMood = Number(sessionStorage.getItem(mood) ?? "0");
		sessionStorage.setItem(mood, Number(totalMood + 1).toString());
		setMood(mood);
	};

	return (
		<div className="mood-container">
			{moods.map((v, i) => (
				<div
					className={`button-mood group`}
					key={i}
					onClick={() => onSelectedMood(v)}
				>
					<img
						src={`/${v}.png`}
						alt={v}
						className="absolute inset-0 size-full group-hover:scale-125 transition-all duration-400 -z-10"
					/>
					<h2 className="text-2xl font-medium text capitalize group-hover:underline">
						{v}
					</h2>
					<p className="text-sm text-gray-300">{i * 10}+ musik</p>
				</div>
			))}
		</div>
	);
};

export default Mood;
