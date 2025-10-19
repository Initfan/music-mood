import { useEffect, useState } from "react";
import type { mood } from "./utils/types";
import { db, storage } from "./utils/appwrite";
import "./App.css";
import { Query } from "appwrite";
import Player from "./components/Player";
import Describe from "./components/Describe";
import Header from "./components/Header";
import Mood from "./components/Mood";
import Track from "./components/Track";

const App = () => {
	const [currentMood, setCurrentMood] = useState<mood | null>(null);
	const [tracks, setTracks] = useState<string[]>([]);

	useEffect(() => {
		if (!currentMood) return;
		setTracks([]);
		db.listRows({
			databaseId: "68da581600322d1917ce",
			tableId: "music",
			queries: [Query.contains("mood", currentMood)],
		}).then((v) =>
			v.rows.map((v) =>
				setTracks((p) => [
					...p,
					storage.getFileView({
						bucketId: "68da58a3000f561df3f2",
						fileId: v.musicId,
					}),
				])
			)
		);
	}, [currentMood]);

	return (
		<div className="space-y-6 w-[90vw] lg:w-[50vw] mx-auto py-4">
			<Header />

			<main className="flex flex-col gap-4 items-start">
				<div className="flex justify-between w-full items-center">
					<h1 className="text-3xl font-medium">
						Apa yang kamu rasakan
					</h1>
					<Describe setMood={(mood) => setCurrentMood(mood)} />
				</div>
				<Mood setMood={(mood) => setCurrentMood(mood)} />

				{currentMood && (
					<div className="w-full flex flex-col gap-4">
						<h1 className="text-xl">
							Daftar musik dengan mood{" "}
							<span className="capitalize font-bold">
								{currentMood}
							</span>
						</h1>

						<Track
							title="Thinking Out Loud"
							duration="3:49"
							likes={150}
							singer="Ed Sheeran"
							src="Thinking_Out_Loud_cover.png"
						/>

						<Player currentMood={currentMood} tracks={tracks} />
					</div>
				)}
			</main>
		</div>
	);
};

export default App;
