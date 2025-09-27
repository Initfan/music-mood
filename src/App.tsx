import { useEffect, useState } from "react";
import Mood from "./components/Mood";
import Describe from "./components/Describe";
import type { mood } from "./utils/types";
import { db, storage } from "./utils/appwrite";
import "./App.css";
import { Query } from "appwrite";

const App = () => {
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
		<main className="container">
			<header>
				<h1>Music by Mood</h1>
				<div>
					<span>Music preference</span>
					<input type="checkbox" defaultChecked id="local" />
					<label htmlFor="local">local</label>
					<input type="checkbox" defaultChecked id="international" />
					<label htmlFor="international">international</label>
				</div>
			</header>
			<section>
				<div>
					<Describe setMood={(mood) => setCurrentMood(mood)} />
					<Mood
						setMood={(mood) => setCurrentMood(mood)}
						currentMood={currentMood!}
					/>
				</div>
				<div>
					<h4>Top mood hari ini</h4>
					<svg
						width="200"
						height="160"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect y="10" width="100%" height="75" fill="grey" />
						<rect y="90" width="100%" height="75" fill="grey" />
					</svg>
				</div>
			</section>

			{/* {currentMood && (
				<>
					<h5>it looks like you are {currentMood}</h5>
					<p>
						Here's some music with <b>{currentMood}</b> mood
					</p>
				</>
			)}
			{tracks &&
				tracks.map((v, i) => <audio src={v} key={i} controls></audio>)} */}
		</main>
	);
};

export default App;
