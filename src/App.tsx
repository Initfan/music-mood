import { useEffect, useRef, useState } from "react";
import type { mood } from "./utils/types";
import { db } from "./utils/appwrite";
import "./App.css";
import { Query } from "appwrite";
import Player from "./components/Player";
import Describe from "./components/Describe";
import Header from "./components/Header";
import Mood from "./components/Mood";
import Track from "./components/Track";
import type { Music } from "./types/appwrite";
import { LoadingTrack, LoadingTrackWithTitle } from "./components/Loading";

const App = () => {
	const trackContainer = useRef<HTMLDivElement>(null);
	const [currentMood, setCurrentMood] = useState<mood | null>(null);
	const [tracks, setTracks] = useState<Music[]>([]);
	const [playlist, setPlaylist] = useState<string[]>([]);
	const [loading, setLoading] = useState({
		track: false,
		newTrack: false,
	});
	const [preference, setPreference] = useState(["local", "international"]);

	useEffect(() => {
		if (!currentMood) return;
		setLoading((p) => ({ ...p, track: !p.track }));
		setTracks([]);
		setPlaylist([]);
		db.listRows<Music>({
			databaseId: "68da581600322d1917ce",
			tableId: "music",
			queries: [
				Query.contains("mood", currentMood),
				Query.limit(5),
				Query.contains("preference", preference),
			],
		}).then((v) => {
			setLoading((p) => ({ ...p, track: !p.track }));
			if (v.total == 0) return;
			setTracks(v.rows);
		});
	}, [currentMood, preference]);

	const scrollTrigger = (el: HTMLDivElement) => {
		const scroll = el.scrollTop / (el.scrollHeight - el.clientHeight);

		if (scroll === 1) {
			setLoading((p) => ({ ...p, newTrack: !p.newTrack }));

			db.listRows<Music>({
				databaseId: "68da581600322d1917ce",
				tableId: "music",
				queries: [
					Query.contains("mood", currentMood!),
					Query.limit(5),
					Query.offset(tracks.length),
					Query.contains("preference", preference),
				],
			}).then((v) => {
				setLoading((p) => ({ ...p, newTrack: !p.newTrack }));

				if (v.total == 0) return;
				setTracks((p) => [...p, ...v.rows]);
			});
		}
	};

	return (
		<div className="space-y-6 w-[90vw] lg:w-[50vw] mx-auto py-4 flex flex-col">
			<Header preference={preference} setPreference={setPreference} />

			<main className="flex flex-col gap-4 items-start">
				<div className="flex justify-between w-full items-center">
					<h1 className="text-2xl md:text-3xl font-medium">
						Apa yang kamu <br className="md:hidden" /> rasakan
					</h1>
					<Describe setMood={(mood) => setCurrentMood(mood)} />
				</div>
				<Mood setMood={(mood) => setCurrentMood(mood)} />

				{!loading.track && !currentMood && (
					<img
						src="/loading.gif"
						alt="loading gif"
						className="self-center"
					/>
				)}

				{loading.track && tracks.length == 0 && (
					<LoadingTrackWithTitle />
				)}

				{!loading.track && currentMood && (
					<div className="w-full flex flex-col gap-4">
						<h1 className="text-xl">
							Daftar musik dengan mood{" "}
							<span className="capitalize font-bold">
								{currentMood}
							</span>
						</h1>

						{tracks.length > 0 ? (
							<div
								className="h-52 space-y-3 overflow-y-scroll scrollbar-hide"
								onScroll={() =>
									trackContainer &&
									scrollTrigger(trackContainer.current!)
								}
								ref={trackContainer}
							>
								{tracks.map((v, i) => (
									<Track
										key={i}
										track={v}
										playlist={playlist}
										setPlaylist={(v) =>
											setPlaylist((p) => [...p, v])
										}
									/>
								))}
								{loading.newTrack && <LoadingTrack />}
							</div>
						) : (
							<p>Musik tidak ditemukan</p>
						)}

						{tracks.length > 0 && playlist.length > 0 && (
							<Player
								currentMood={currentMood}
								tracks={playlist}
							/>
						)}
					</div>
				)}
			</main>
		</div>
	);
};

export default App;
