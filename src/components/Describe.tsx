import { useRef, useState } from "react";
import AI from "../utils/ai";
import type { mood } from "../utils/types";

const Describe = ({ setMood }: { setMood: (mood: mood) => void }) => {
	const described = useRef<HTMLTextAreaElement>(null);
	const [loading, setLoading] = useState(false);

	const identifyMood = async () => {
		setLoading((p) => !p);
		if (!described.current || !described.current.value) return;

		const response = await AI.models.generateContent({
			model: "gemini-2.5-flash",
			contents: described.current.value,
			config: {
				systemInstruction:
					"Identifikasi mood sesuai cerita yang telah diberikan, berikan respon dalam satu kata berupa mood. mood yang terdefinis diantaranya energik, focus, santai, sedih, senang",
			},
		});

		setLoading((p) => !p);
		setMood(response.text as mood);
	};

	return (
		<>
			<div className="describe">
				<h2>Ceritakan mood anda hari ini</h2>
				<button onClick={identifyMood} disabled={loading}>
					{loading ? "identify..." : "identify"}
				</button>
			</div>
			<textarea
				id="describe"
				name="describe"
				placeholder="Describe what you feel..."
				ref={described}
			></textarea>
		</>
	);
};

export default Describe;
