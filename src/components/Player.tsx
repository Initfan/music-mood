import { useRef, useEffect, useState } from "react";
import type { SpotifyEmbedController, SpotifyIframeApi } from "../utils/types";

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (SpotifyIframeApi: SpotifyIframeApi) => void;
	}
}

const Player = ({ uri }: { uri: string }) => {
	const embedRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const spotifyEmbedControllerRef = useRef<SpotifyEmbedController>(null);

	useEffect(() => {
		setLoading(true);
		if (!spotifyEmbedControllerRef.current)
			window.onSpotifyIframeApiReady = (
				SpotifyIframeApi: SpotifyIframeApi
			) => {
				SpotifyIframeApi.createController(
					embedRef.current,
					{
						width: "100%",
						height: "352",
						uri: uri,
					},
					(spotifyEmbedController) => {
						spotifyEmbedController.addListener("", () => {
							setLoading(false);
						});
						spotifyEmbedControllerRef.current =
							spotifyEmbedController;
					}
				);
			};
		else {
			spotifyEmbedControllerRef.current.addListener("ready", () => {
				setLoading(false);
			});
			spotifyEmbedControllerRef.current.loadUri(uri);
		}
	}, [uri]);

	return (
		<div>
			<div ref={embedRef} />
			{loading && <p>Loading music...</p>}
		</div>
	);
};

export default Player;
