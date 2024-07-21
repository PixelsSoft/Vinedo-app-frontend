import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./VideoPosts.module.scss";
import ImageComponent from "../../ui/Image/ImagePostsComponent";
import { FaPlay } from "react-icons/fa";

function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const VideoPosts = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div className={`${css.videoPosts}`}>
      {posts?.map(
        (item) =>
          item.type === 1 && (
            <div
              className={css.post}
              onClick={() => navigate(`/videos/${item.id}`)}
              key={item.id}
            >
              <ImageComponent
                src={
                  import.meta.env.VITE_VIDEO_THUMBNAIL +
                  item.video_post?.thumbnail
                }
                alt="Post"
                radius="none"
                width={"100%"}
                height={120}
              />

              <div className={css.duration}>
                <FaPlay fontSize={8} />
                <span>{formatDuration(item.video_post?.duration)}</span>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default VideoPosts;
