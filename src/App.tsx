import { useEffect, useState } from "react";
import Mood from "./components/Mood";
import Describe from "./components/Describe";
import type { mood } from "./utils/types";
import { db, storage } from "./utils/appwrite";
import "./App.css";
import { Query } from "appwrite";
import { Card, CardBody } from "@heroui/card";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/react";
import Player from "./components/Player";
import Chart from "./components/Chart";

const App = () => {
	const [currentMood, setCurrentMood] = useState<mood | null>(null);
	const [tracks, setTracks] = useState<string[]>([]);
	const [preference, setPreference] = useState(["local", "international"]);

	useEffect(() => {
		if (!currentMood) return;
		setTracks([]);
		db.listRows({
			databaseId: "68da581600322d1917ce",
			tableId: "music",
			queries: [
				Query.contains("mood", currentMood),
				Query.contains("preference", preference),
			],
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
	}, [currentMood, preference]);

	return (
		<div className="space-y-6 w-[90vw] lg:w-[80vw] mx-auto">
			<header>
				<Card radius="sm">
					<CardBody>
						<div className="flex justify-between p-3">
							<h1 className="text-2xl font-semibold">
								Music by Mood
							</h1>
							<Dropdown>
								<DropdownTrigger>
									<Button variant="light" color="primary">
										Music Preference
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									selectionMode="multiple"
									closeOnSelect={false}
									disallowEmptySelection
									selectedKeys={preference}
									onSelectionChange={(keys) =>
										setPreference(
											Array.from(keys as Set<string>)
										)
									}
								>
									<DropdownItem key="local">
										Local
									</DropdownItem>
									<DropdownItem key="international">
										International
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					</CardBody>
				</Card>
			</header>
			<main className="flex flex-col lg:flex-row gap-4 items-start">
				<div className="lg:w-2/3 w-full space-y-3">
					<Card className="p-3 space-y-3">
						<CardBody>
							<Describe
								setMood={(mood) => setCurrentMood(mood)}
							/>
							<Mood
								setMood={(mood) => setCurrentMood(mood)}
								currentMood={currentMood!}
							/>
						</CardBody>
					</Card>
					{tracks.length > 0 && currentMood && (
						<Player tracks={tracks} currentMood={currentMood} />
					)}
				</div>
				<Card className="flex-1 w-full md:w-auto p-3">
					<CardBody>
						<h4 className="text-lg mb-3">Top mood hari ini</h4>
						<div className="min-h-[250px] overflow-hidden">
							<Chart />
						</div>
					</CardBody>
				</Card>
			</main>
		</div>
	);
};

export default App;
