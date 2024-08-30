import React from "react";
import css from "./Posts.module.scss";
import { useNavigate } from "react-router-dom";
import ImageComponent from "../../ui/Image/ImagePostsComponent";
import PostSkeleton from "./PostSkeleton";
import { IoCopy } from "react-icons/io5";
import { BiSolidCopy } from "react-icons/bi";
import multipleIcon from "../../../assets/multiplePosts.svg"

const Posts = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div className={css.posts}>
      {posts?.slice().reverse().map(
        (item) =>
          item?.type === 0 && (
            <div
              className={css.post}
              onClick={() => navigate(`/posts/${item.id}`)}
              key={item.id}
            >
              <ImageComponent
                src={
                  item?.images && item?.images?.length > 0
                    ? import.meta.env.VITE_IMAGE_POST_URI +
                      item.images[0].filename
                    : null
                }
                alt="Post"
                radius="none"
                width={"100%"}
                height={120}
              />

              {/* Multiple Posts Icon  */}
              {posts && item.images.length > 1 && (
                <div className={css.multiplePosts}>
                  <img src={multipleIcon} alt="" />
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default Posts;
