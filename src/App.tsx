import { useEffect, useState } from "react";
import Mood from "./components/Mood";
import Describe from "./components/Describe";
import type { mood } from "./utils/types";
import supabase from "./utils/supabase";

const App = () => {
	const [isDescribe, setIsDescribe] = useState<boolean>(false);
	const [currentMood, setCurrentMood] = useState<mood | null>(null);
	// const [tracks, setTracks] = useState<string[]>([]);

	useEffect(() => {
		if (!currentMood) return;
		// supabase
		// 	.from("music")
		// 	.select()
		// 	.then((v) => {
		// 		v.data?.map((v) =>
		// 			supabase.storage
		// 				.from("music")
		// 				.createSignedUrl(`${v.mood}/${v.name}.mp3`, 60)
		// 				.then(
		// 					(v) =>
		// 						v.data &&
		// 						setTracks((p) => [...p, v.data.signedUrl])
		// 				)
		// 		);
		// 	});
	}, [currentMood]);

	return (
		<main>
			<h1>Find music that suit your mood</h1>
			{isDescribe ? (
				<Describe setMood={(mood) => setCurrentMood(mood)} />
			) : (
				<Mood
					setMood={(mood) => setCurrentMood(mood)}
					currentMood={currentMood!}
				/>
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
			<div>
				<span>Music preference</span>
				<input type="checkbox" defaultChecked id="local" />
				<label htmlFor="local">local</label>
				<input type="checkbox" defaultChecked id="international" />
				<label htmlFor="international">international</label>
			</div>
			{/* {tracks &&
				tracks.map((v, i) => <audio src={v} key={i} controls></audio>)} */}
		</main>
	);
};

export default App;
