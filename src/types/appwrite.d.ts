import type { Models } from "appwrite";

export type Music = Models.Row & {
	musicId: string;
	mood: string;
	preference: string;
	title: string;
	singer: string | null;
	image: string;
};
