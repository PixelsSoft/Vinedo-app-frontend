import React from 'react'
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

const TestVidStack = ({src}) => {
  return (
    <div>
      <MediaPlayer
        title="Post"
        src={src}
        playsInline
        aspectRatio='auto'
        loop
      >
        <MediaProvider />
        <DefaultVideoLayout
          thumbnails=""
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>
    </div>
  );
}

export default TestVidStack