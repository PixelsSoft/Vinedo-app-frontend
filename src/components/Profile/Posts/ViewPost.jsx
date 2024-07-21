import React, { useEffect, useState } from "react";
import css from "./ViewPost.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import BottomPostActions from "./BottomPostActions";
import ImagePostViewComponent from "../../ui/Image/ImagePostViewComponent";
import RatingModal from "../Modals/RatingModal/RatingModal";
import {
  useGetPostByIdQuery,
  useViewAPostMutation,
} from "../../../services/api/postApi/postApi";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import ImageProfileComponent from "../../ui/Image/ImageProfileComponent";
import MultiplePostCarousel from "./MultiplePostCarousel";

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

const ViewPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const {
    data,
     isLoading,
    isSuccess,
    refetch
  } = useGetPostByIdQuery(postId);
  const [isRatingModal, setIsRatingModal] = useState(false);
  const { user } = useSelector((store) => store.auth);

  //  Vote a post mutation
  const [viewAPost, resp] = useViewAPostMutation();

  useEffect(()=>{
    if (data && isSuccess) {
       const isViewed = data.isViewed;
       if (!isViewed) {
         viewAPost(data?.post?.id);
       }
     }
  },[data,isSuccess])

  return (
    <div className="w-screen h-screen bg-[#110e0f] md:max-w-sm overflow-x-hidden scrollbar-hide flex justify-center items-center flex-col md:mx-auto">
      <div className={css.viewPostWrap}>
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

        {/* Post Image  */}
        <AnimatePresence mode="wait">
          <motion.div
            key="postImage"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{
              duration: 0.22,
            }}
            style={{ height: "100%", width: "100%", position: "relative" }}
          >
            <div className={css.postImage}>
              {isLoading ? (
                <div className="h-full w-full -mt-6 flex items-center justify-center">
                  <ClipLoader color="#3632FF" size={43} speedMultiplier={0.9} />
                </div>
              ) : data.post.images.length > 1 ? (
                <MultiplePostCarousel
                  images={data?.post?.images}
                  isLoading={isLoading}
                />
              ) : (
                <ImagePostViewComponent
                  src={
                    import.meta.env.VITE_IMAGE_POST_URI +
                    data?.post?.images[0].filename
                  }
                  radius={0}
                  isLoading={isLoading}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Post Actions  */}
        {!isLoading && data && (
          <BottomPostActions
            data={data}
            postId={postId}
            setIsRatingModal={setIsRatingModal}
          />
        )}

        {/* Rating Modal  */}
        <RatingModal
          isRatingModal={isRatingModal}
          setIsRatingModal={setIsRatingModal}
        />
      </div>
    </div>
  );
};

export default ViewPost;
