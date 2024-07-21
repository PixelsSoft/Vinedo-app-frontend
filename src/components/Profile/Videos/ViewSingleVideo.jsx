import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import css from "./PlayVideo.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import BottomVideoActions from "./BottomVideoActions";
import RatingModal from "../Modals/RatingModal/RatingModal";
import {
  useGetPostByIdQuery,
  useViewAPostMutation,
} from "../../../services/api/postApi/postApi";
import { ClipLoader } from "react-spinners";
import ImageProfileComponent from "../../ui/Image/ImageProfileComponent";

const variants = {
  initial: {
    y: 10,
    opacity: 0,
    scale: 0.7,
  },
  enter: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    y: -10,
    opacity: 0,
    scale: 0,
  },
};

const ViewSingleVideo = () => {
  const navigate = useNavigate();
  const [isRatingModal, setIsRatingModal] = useState(false);
  const { postId } = useParams();
  const { data, isLoading, isSuccess, refetch } = useGetPostByIdQuery(postId);

  //  Vote a post mutation
  const [viewAPost, resp] = useViewAPostMutation();

  useEffect(() => {
    if (data && isSuccess) {
      const isViewed = data.isViewed;
      if (!isViewed) {
        viewAPost(data?.post?.id);
      }
    }
  }, [data, isSuccess]);

  // useEffect(()=>{
  //    var video = document.createElement("video");

  //    // Set the src attribute to your video URL
  //    video.src = v1;

  //    // Listen for the loadedmetadata event
  //    video.onloadedmetadata = function () {
  //      // Once the metadata is loaded, you can access the video's width and height
  //      var videoWidth = video.videoWidth;
  //      var videoHeight = video.videoHeight;

  //     //  setDimensions({width: videoWidth, height: videoHeight});
  //       var aspectRatio = videoWidth / videoHeight;
  //       setRatio(aspectRatio);

  //      console.log("Video width:", videoWidth);
  //      console.log("Video height:", videoHeight);
  //       console.log("Aspect ratio:", aspectRatio);
  //    };

  //    // Start loading the video metadata
  //    video.load();
  // },[]);

  return (
    <div
      className="viewSingleVidePost w-screen h-screen bg-[#110e0f] md:max-w-sm overflow-x-hidden scrollbar-hide flex justify-center items-center flex-col md:mx-auto"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className={`scrollbar-hide ${css.viewPostWrap}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key="postVideo"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{
              duration: 0.22,
            }}
            style={{ height: "100%", width: "100%", position: "relative" }}
          >
            <div className={css.header}>
              <div className={css.left} onClick={() => navigate(-1)}>
                <IoIosArrowBack fontSize={28} />
              </div>
              <div className={css.right}>
                <div className={css.image}>
                  {data && (
                    <ImageProfileComponent
                      src={
                        import.meta.env.VITE_PROFILE_PICTURE +
                        data?.post?.user?.profile_picture
                      }
                      alt=""
                      radius="full"
                      width={"100%"}
                      height={28}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className={css.name}>
                  <p>{data?.post?.user?.name}</p>
                  <span>{data && `@${data?.post?.user?.username}`}</span>
                </div>
              </div>
            </div>

            {/* Video  */}
            <div
              className={css.postImage}
              onContextMenu={(e) => e.preventDefault()}
            >
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <ClipLoader color="#3632FF" size={43} speedMultiplier={0.9} />
                </div>
              ) : (
                <video
                  style={{ height: "100%" }}
                  className={css.video}
                  controls
                  autoPlay
                  loop
                  width={"100%"}
                  height={"auto"}
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source
                    src={
                      import.meta.env.VITE_VIDEO_POST_URI +
                      data?.post?.video_post.filename
                    }
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Bottom Video Actions  */}
            {!isLoading && (
              <BottomVideoActions
                setIsRatingModal={setIsRatingModal}
                data={data}
                postId={postId}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Rating Modal  */}
        <RatingModal
          isRatingModal={isRatingModal}
          setIsRatingModal={setIsRatingModal}
        />
      </div>
    </div>
  );
};

export default ViewSingleVideo;
