import { useEffect, useState } from "react";
import Mood from "./components/Mood";
import Describe from "./components/Describe";
import type { mood } from "./utils/types";
// import Player from "./components/Player";

const App = () => {
	const [isDescribe, setIsDescribe] = useState<boolean>(false);
	const [currentMood, setCurrentMood] = useState<mood | null>(null);

	useEffect(() => {
		if (localStorage.getItem("token")) return;

		const generateToken = async () => {
			const res = await fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `grant_type=client_credentials&client_id=${
					import.meta.env.VITE_SPOTIFY_CLIENT
				}&client_secret=${import.meta.env.VITE_SPOTIFY_SECRET}`,
			});

			const data = await res.json();

			localStorage.setItem("token", data.access_token);
		};
		generateToken();
	}, []);

	return (
		<main>
			<h1>Find music that suit your mood</h1>
			{isDescribe ? (
				<Describe setMood={(mood) => setCurrentMood(mood)} />
			) : (
				<Mood setMood={(mood) => setCurrentMood(mood)} />
			)}
			<button onClick={() => setIsDescribe((p) => !p)}>
				{isDescribe ? "Pick mood" : "Desribe what i feel"}
			</button>
			{currentMood && (
				<>
					<h5>it looks like you are {currentMood}</h5>
					<p>
						Here's some music with <b>{currentMood}</b> mood
					</p>
				</>
			)}
			{/* <Player /> */}
		</main>
	);
};

export default App;
