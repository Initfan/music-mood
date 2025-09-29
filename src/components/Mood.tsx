import { Button } from "@heroui/button";
import type { mood } from "../utils/types";

const Mood = ({
	setMood,
	currentMood,
}: {
	setMood: (mood: mood) => void;
	currentMood: mood;
}) => {
	const moods: mood[] = ["focus", "santai", "sedih", "senang"];

	const onSelectedMood = (mood: mood) => {
		const totalMood = Number(sessionStorage.getItem(mood) ?? "0");
		sessionStorage.setItem(mood, Number(totalMood + 1).toString());
		setMood(mood);
	};

	return (
		<div className="mt-3">
			{moods.map((v, i) => (
				<Button
					color="primary"
					radius="sm"
					className="mr-2 capitalize"
					variant={v == currentMood ? "solid" : "flat"}
					key={i}
					onClick={() => onSelectedMood(v)}
					disabled={v == currentMood}
				>
					{v}
				</Button>
			))}
		</div>
	);
};

export default Mood;
