import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { GoUnmute } from "react-icons/go";
import css from "./Videojs.module.scss"

const options = {
  autoplay: true,
  controls: true,
//   responsive: true,
//   fluid: true,
  loop: true,
  aspectratio: "16:9",
  bigPlayButton: true,
  controlBar: {
    fullscreenToggle: true,
    pictureInPictureToggle: false,
    remainingTimeDisplay: false,
    volumePanel: false,
    currentTimeDisplay: true,
    durationDisplay: true,
  },
  sources: [
    {
      src: "",
      type: "video/mp4",
    },
  ],
};


export const VideoJsPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
//   const { options, onReady } = props;

  const onReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

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
    <div className={css.wrapperTest}>
      <div data-vjs-player className={css.videoContainer}>
        <div ref={videoRef} className={css.videoWrap} />
      </div>
    </div>
  );
};

export default VideoJsPlayer;
