import { useRef, useState } from "react";
import AI from "../utils/ai";
import type { mood } from "../utils/types";
import { Button, Textarea } from "@heroui/react";

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
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-xl font-medium">
					Ceritakan mood anda hari ini
				</h2>
				<Button
					onClick={identifyMood}
					disabled={loading}
					size="sm"
					color="primary"
					isLoading={loading}
				>
					{loading ? "Indentifying..." : "Identify"}
				</Button>
			</div>
			<Textarea
				id="describe"
				name="describe"
				placeholder="Describe what you feel..."
				radius="sm"
				ref={described}
			></Textarea>
		</>
	);
};

export default Describe;
