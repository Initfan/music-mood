import { useRef } from "react";
import AI from "../utils/ai";

const Describe = () => {
	const described = useRef<HTMLTextAreaElement>(null);

	const identifyMood = async () => {
		if (!described.current || !described.current.value) return;
		alert(described.current.value);
		const response = await AI.models.generateContent({
			model: "gemini-2.5-flash",
			contents: described.current.value,
			config: {
				systemInstruction:
					"Identifikasi mood sesuai cerita yang telah diberikan, berikan respon dalam satu kata berupa mood.",
			},
		});

		return { data: response.text };
	};

	return (
		<div>
			<textarea
				placeholder="Describe what you feel..."
				ref={described}
			></textarea>
			<button onClick={identifyMood}>identify</button>
		</div>
	);
};

export default Describe;
