import { Button } from "@heroui/button";
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
		<div className="mt-3">
			{moods.map((v, i) => (
				<Button
					color="primary"
					radius="sm"
					className="mr-2"
					variant={v == currentMood ? "solid" : "flat"}
					key={i}
					onClick={() => setMood(v)}
					disabled={v == currentMood}
				>
					{v}
				</Button>
			))}
		</div>
	);
};

export default Mood;
