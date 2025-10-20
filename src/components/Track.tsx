import { Disc3, Ellipsis, Heart } from "lucide-react";
import type { Music } from "../types/appwrite";
import { storage } from "../utils/appwrite";
import { useEffect, useState } from "react";

const Track = ({
	track,
	playlist,
	setPlaylist,
}: {
	track: Music;
	playlist: string[];
	setPlaylist: (v: string) => void;
}) => {
	const musicUrl = storage.getFileView({
		bucketId: "68da58a3000f561df3f2",
		fileId: track.musicId,
	});
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (playlist.find((v) => v == musicUrl)) setIsPlaying(true);
	}, [playlist, musicUrl]);

	return (
		<div
			className="flex space-x-3 w-full cursor-pointer"
			onClick={() => !isPlaying && setPlaylist(musicUrl)}
		>
			<img
				className="md:h-24 md:w-24 h-18 w-16 rounded"
				src={track.image}
			></img>
			<div className="flex flex-col justify-between flex-1 group gap-3">
				<div className="flex flex-col group-hover:underline">
					<h3 className="md:text-xl">{track.title}</h3>
					<p className="text-sm text-gray-400">{track.singer}</p>
				</div>
				<div className="flex space-x-3">
					<p className="text-sm md:text-base flex items-center gap-2">
						<Disc3
							size={20}
							className={isPlaying ? "animate-spin" : ""}
						/>{" "}
						{isPlaying ? "Memainkan" : "Mainkan"}
					</p>
					<p className="text-sm md:text-base flex items-center gap-2">
						<Heart size={20} fill="red" stroke="0" /> 0
					</p>
				</div>
			</div>
			<div className="items-start flex gap-3">
				<button>
					<Heart className="size-5 md:size-6" />
				</button>
				<button>
					<Ellipsis className="size-5 md:size-6" />
				</button>
			</div>
		</div>
	);
};

export default Track;
