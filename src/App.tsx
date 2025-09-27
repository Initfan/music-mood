import { useEffect, useState } from "react";
import Mood from "./components/Mood";
import Describe from "./components/Describe";
import type { mood } from "./utils/types";
import { db, storage } from "./utils/appwrite";
import { Query } from "appwrite";

const App = () => {
	const [isDescribe, setIsDescribe] = useState<boolean>(false);
	const [currentMood, setCurrentMood] = useState<mood | null>(null);
	const [tracks, setTracks] = useState<string[]>([]);

	useEffect(() => {
		if (!currentMood) return;
		setTracks([]);
		db.listRows({
			databaseId: "68d838a70037b2eff52d",
			tableId: "musics",
			queries: [Query.contains("mood", currentMood)],
		}).then((v) =>
			v.rows.map((v) =>
				setTracks((p) => [
					...p,
					storage.getFileView({
						bucketId: "68d8349b00000b682bac",
						fileId: v.musicId,
					}),
				])
			)
		);
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
			{tracks &&
				tracks.map((v, i) => <audio src={v} key={i} controls></audio>)}
		</main>
	);
};

export default App;
