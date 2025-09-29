import { useEffect, useState } from "react";
import Mood from "./components/Mood";
import Describe from "./components/Describe";
import type { mood } from "./utils/types";
import { db, storage } from "./utils/appwrite";
import "./App.css";
import { Query } from "appwrite";
import Header from "./components/Header";
import { Card, CardBody } from "@heroui/card";
import Player from "./components/Player";

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
		<div className="space-y-6 w-[90vw] lg:w-[80vw] mx-auto">
			<Header />
			<main>
				<Card>
					<CardBody>
						<div className="flex gap-4">
							<section className="p-3 space-y-4 w-2/3">
								<Describe
									setMood={(mood) => setCurrentMood(mood)}
								/>
								<Mood
									setMood={(mood) => setCurrentMood(mood)}
									currentMood={currentMood!}
								/>
							</section>
							<section>
								<h4 className="text-lg ">Top mood hari ini</h4>
							</section>
						</div>
					</CardBody>
				</Card>
			</main>

			{tracks.length > 0 && currentMood && (
				<Player tracks={tracks} currentMood={currentMood} />
			)}
		</div>
	);
};

export default App;
