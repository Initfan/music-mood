export type mood = "focus" | "sedih" | "senang" | "energik" | "santai";

export interface SpotifyIframeApi {
	createController: (
		element: HTMLElement | null,
		options: {
			width: string;
			height: string;
			uri: string;
		},
		callback: (controller: SpotifyEmbedController) => void
	) => void;
}

export interface SpotifyEmbedController {
	addListener: (
		event: string,
		callback: (e: SpotifyEmbedEvent) => void
	) => void;
	removeListener: (event: string) => void;
	play: () => void;
	pause: () => void;
	loadUri: (uri: string) => void;
}

export interface SpotifyEmbedEvent {
	data: {
		position?: number;
		duration?: number;
		isBuffering?: boolean;
		isPaused?: boolean;
		playingURI?: string;
	};
}
