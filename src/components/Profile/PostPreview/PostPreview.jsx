import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./PostPreview.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getVideoCover } from "../../../utils/helpers/helpers";
import { ClipLoader } from "react-spinners";
import { setActivePostTab, setPostFile } from "../../../services/slices/posts/postSlice";
import { useCreatePostMutation } from "../../../services/api/postApi/postApi";
import VideoPreview from "./VideoPreview";
import { Button } from "@nextui-org/react";
import ImageComponent from "../../ui/Image/ImagePostsComponent";
import VideoPlayer from "./VideoPlayer";
import ImageProfileComponent from "../../ui/Image/ImageProfileComponent";
import MultiplePostsSwiper from "./MultiplePostsSwiper";

// Function to convert data URI to Blob
function dataURItoBlob(dataURI) {
    // Split the Base64 string into parts
    let parts = dataURI.split(',');
    let byteString = atob(parts[1]);
    // Create a Uint8Array from the Base64 string
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    // Create a Blob object from the Uint8Array
    return new Blob([intArray], { type: parts[0].split(':')[1].split(';')[0] });
}

const PostPreview = () => {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const { file } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Create Post Request
  const [createPost, res] = useCreatePostMutation();
  const { isLoading, error, isSuccess } = res;

  useMemo(() => {
    if (isSuccess) {
      navigate("/profile");
    }
  }, [isSuccess]);

  const handleVideo = async (video) => {
    const cover = await getVideoCover(video, 1);
    let blob = dataURItoBlob(cover);
    setVideoThumbnail(blob);

    setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1600);
  };

  // useEffect(() => {
  //   if (!file) {
  //     dispatch(setPostFile(null));
  //     navigate("/profile");
  //     return;
  //   }

  //   if (file && file?.type === "image") {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file.file);
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     dispatch(setActivePostTab(0));
  //   }

  //   if (file && file.type === "video") {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file.file);
  //     reader.onloadend = () => {
  //       setVideoPreview(reader.result);
  //     };
  //     dispatch(setActivePostTab(1));

  //     handleVideo(file?.file);
  //   }
  // }, [file, navigate]);

  useEffect(() => {
    if (!file) {
      dispatch(setPostFile(null));
      navigate("/profile");
      return;
    }

    if (Array.isArray(file.files)) {
      // Handle multiple images
      const imagePreviews = file.files.map((imageFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      });

      Promise.all(imagePreviews).then((previews) => {
        setImagePreview(previews);
        dispatch(setActivePostTab(0));
      });
    } else if (file.type === "video") {
      const reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      dispatch(setActivePostTab(1));

      handleVideo(file?.file);
    }
  }, [file, navigate]);

  const handleBack = () => {
    dispatch(setPostFile(null));
    navigate(-1);
  };

  const handleSubmit = async () => {
    let formData = new FormData();
   
    if(file?.type === "image"){
      file.files.forEach((file, index) => {
        formData.append("post_file[]", file);
      });
    }else{
      formData.append("post_file[]", file?.file);
    }
    
    if (file?.type === "video") {
      formData.append("thumbnail", videoThumbnail, "thumbnail.png");
      formData.append("duration", file?.duration);
    }

    const { data } = await createPost(formData);
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    // fluid: true,
    loop: true,
    bigPlayButton: false,
    controlBar: {
      fullscreenToggle: true,
      pictureInPictureToggle: false,
      remainingTimeDisplay: false,
      volumePanel: true,
      currentTimeDisplay: true,
      durationDisplay: true,
    },
    sources: [
      {
        src: videoPreview,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <div className={`${css.wrapper} postPreview`}>
      <header>
        <IoIosArrowBack onClick={handleBack} />
        <p>Create Post</p>
      </header>

      {file && (
        <>
          <div className={css.profile}>
            <div className={css.left}>
              <ImageProfileComponent
                src={
                  import.meta.env.VITE_PROFILE_PICTURE + user?.profile_picture
                }
                alt=""
                radius="full"
                width={"100%"}
                height={"2.7rem"}
                className="rounded-full"
              />
            </div>
            <div className={css.right}>
              <p>{user?.name}</p>
              <span>{user?.username}</span>
            </div>
          </div>
          {file?.type === "image" ? (
            imagePreview?.length === 1 ? (
              <motion.div
                key="previwImage"
                className={css.imageCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: file ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {imagePreview && <img src={imagePreview} alt="" />}
              </motion.div>
            ) : (
              imagePreview && <MultiplePostsSwiper images={imagePreview} />
            )
          ) : isVideoLoaded ? (
            <>
              <motion.div
                key="previwImage"
                className={css.videoCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: file ? 1 : 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* <VideoPreview src={videoPreview} /> */}
                {/* <TestVidStack src={videoPreview} /> */}
                <VideoPlayer
                  options={videoJsOptions}
                  onReady={handlePlayerReady}
                />
                {/* <VideoJsPlayer
                  options={videoJsOptions}
                  onReady={handlePlayerReady}
                /> */}
              </motion.div>
            </>
          ) : (
            <div className="w-full -mt-5 flex justify-center items-center h-[50%]">
              <ClipLoader color="#3632FF" size={45} speedMultiplier={0.8} />
            </div>
          )}
          {/* <motion.div
            key="previwImage"
            className={css.postCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: file ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {file?.type === "image" ? (
              imagePreview && <img src={imagePreview} alt="" />
            ) : isVideoLoaded ? (
              <>
                <VideoPlayer
                  options={videoJsOptions}
                  onReady={handlePlayerReady}
                />
              </>
            ) : (
              <div className="w-full -mt-5 flex justify-center items-center h-full">
                <ClipLoader color="#3632FF" size={45} speedMultiplier={0.8} />
              </div>
            )}
          </motion.div> */}

          <div className={css.postButton}>
            <Button
              disabled={!file || (file.type === "video" && !isVideoLoaded)}
              onClick={handleSubmit}
              className="bg-transparent"
              isLoading={isLoading}
            >
              Share
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostPreview;
