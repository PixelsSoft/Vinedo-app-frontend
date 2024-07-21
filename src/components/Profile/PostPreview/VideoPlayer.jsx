import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// import "@videojs/themes/dist/city/index.css";
// import "@videojs/themes/dist/fantasy/index.css";
// import "@videojs/themes/dist/forest/index.css";
// import "@videojs/themes/dist/sea/index.css";
import { GoUnmute } from "react-icons/go";

export const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      // videoElement.classList.add("vjs-theme-city");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {

        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      data-vjs-player
      style={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <div
        ref={videoRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height:"100%",
          maxHeight: "380px",
          width: "100%",
          flexDirection: "column",
        }}
      />
    </div>
  );
};

export default VideoPlayer;
