import { useRef, useState, useEffect } from "react";
import type { SpotifyEmbedController, SpotifyIframeApi } from "../utils/types";

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (SpotifyIframeApi: SpotifyIframeApi) => void;
	}
}

const Player = () => {
	const embedRef = useRef(null);
	const spotifyEmbedControllerRef = useRef<SpotifyEmbedController>(null);
	const [iFrameAPI, setIFrameAPI] = useState<SpotifyIframeApi>();
	const [uri] = useState("spotify:playlist:37i9dQZF1DZ06evO3eIivx");

	useEffect(() => {
		if (iFrameAPI) {
			return;
		}

		window.onSpotifyIframeApiReady = (
			SpotifyIframeApi: SpotifyIframeApi
		) => {
			setIFrameAPI(SpotifyIframeApi);
		};
	}, [iFrameAPI]);

	useEffect(() => {
		if (iFrameAPI === undefined) return;

		iFrameAPI.createController(
			embedRef.current,
			{
				width: "100%",
				height: "352",
				uri: uri,
			},
			(spotifyEmbedController) => {
				spotifyEmbedControllerRef.current = spotifyEmbedController;
			}
		);

		return () => {
			if (spotifyEmbedControllerRef.current) {
				spotifyEmbedControllerRef.current.removeListener(
					"playback_update"
				);
			}
		};
	}, [iFrameAPI, uri]);

	return (
		<div>
			<div ref={embedRef} />
		</div>
	);
};

export default Player;
