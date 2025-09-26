import { useEffect, useState } from "react";
import Mood from "./components/Mood";
import Describe from "./components/Describe";
import type { mood } from "./utils/types";
import Player from "./components/Player";

const App = () => {
	const [isDescribe, setIsDescribe] = useState<boolean>(false);
	const [currentMood, setCurrentMood] = useState<mood | null>(null);
	const [tracks, setTracks] = useState<string | null>(null);

	useEffect(() => {
		if (sessionStorage.getItem("token")) return;

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

			sessionStorage.setItem("token", data.access_token);
		};
		generateToken();
	}, []);

	useEffect(() => {
		if (!currentMood) return;
		const getTracks = async () => {
			const token = sessionStorage.getItem("token");
			console.log(token);
			const res = await fetch(
				`https://api.spotify.com/v1/users/${
					import.meta.env.VITE_SPOTIFY_USER_ID
				}/playlists`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await res.json();

			data.items.filter(
				(v: { name: string; uri: string }) =>
					v.name == currentMood.toLowerCase() && setTracks(v.uri)
			);
		};
		getTracks();
	}, [currentMood]);

	console.log(tracks);

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
			{tracks && <Player uri={tracks} />}
		</main>
	);
};

export default App;
