import { Skeleton } from "@heroui/react";
import { Disc3, Ellipsis, Heart } from "lucide-react";

export const LoadingTrack = () => {
	return (
		<div className="w-full flex flex-col gap-4">
			<Skeleton className="rounded w-1/2">
				Lorem ipsum dolor sit amet.
			</Skeleton>
			<div className="flex space-x-3 w-full cursor-pointer">
				<Skeleton className="h-24 w-24 rounded" />
				<div className="flex flex-col justify-between flex-1 group">
					<div className="flex flex-col group-hover:underline gap-2">
						<Skeleton className="rounded">
							<h3 className="text-xl">Lorem, ipsum dolor.</h3>
						</Skeleton>
						<Skeleton className="rounded">
							<p className="text-sm text-gray-400">
								Lorem, ipsum.
							</p>
						</Skeleton>
					</div>
					<div className="flex space-x-3">
						<Skeleton className="rounded">
							<p className="text-sm flex items-center gap-2">
								<Disc3 size={20} /> Diputar
							</p>
						</Skeleton>
						<Skeleton className="rounded">
							<p className="text-sm flex items-center gap-2">
								<Heart size={20} fill="red" stroke="0" /> 0
							</p>
						</Skeleton>
					</div>
				</div>
				<div className="items-start flex gap-3">
					<Skeleton className="rounded">
						<button>
							<Heart />
						</button>
					</Skeleton>
					<Skeleton className="rounded">
						<button>
							<Ellipsis />
						</button>
					</Skeleton>
				</div>
			</div>
		</div>
	);
};
