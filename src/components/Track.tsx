import { Disc3, Ellipsis, Heart } from "lucide-react";

type track = {
	src: string;
	title: string;
	singer: string;
	duration: string;
	likes: number;
};

const Track = ({ src, title, singer, duration, likes }: track) => {
	return (
		<div className="flex space-x-3 w-full cursor-pointer ">
			<img className="h-24 w-24 rounded" src={src}></img>
			<div className="flex flex-col justify-between flex-1 group">
				<div className="flex flex-col group-hover:underline">
					<h3 className="text-xl">{title}</h3>
					<p className="text-sm text-gray-400">{singer}</p>
				</div>
				<div className="flex space-x-3">
					<p className="text-sm flex items-center gap-2">
						<Disc3 size={20} /> {duration}
					</p>
					<p className="text-sm flex items-center gap-2">
						<Heart size={20} fill="red" stroke="0" /> {likes}
					</p>
				</div>
			</div>
			<div className="items-start flex gap-3">
				<button>
					<Heart />
				</button>
				<button>
					<Ellipsis />
				</button>
			</div>
		</div>
	);
};

export default Track;
