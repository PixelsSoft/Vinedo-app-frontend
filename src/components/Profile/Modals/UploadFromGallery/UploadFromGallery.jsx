import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./UploadFromGallery.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { setPostFile } from "../../../../services/slices/posts/postSlice";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../../Toast/Toast";

const UploadFromGallery = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const postRef = useRef(null);
  const dispatch = useDispatch();
  const { file } = useSelector((store) => store.post);

  // const handlePostChange = (event) => {
  //   const files = event.target.files[0];
  //   if (files) {

  //     if (files.type.startsWith("image")) {
  //       dispatch(setPostFile({ type: "image", file: files }));
  //     } else if (files.type.startsWith("video")) {

  //       // First Check size of the file to be less than 50 mb 
  //        if (files.size <= 50 * 1024 * 1024) {
  //          // Create a URL for the selected video file

  //          const videoURL = URL.createObjectURL(files);

  //          // Create a video element
  //          const video = document.createElement("video");
  //          video.preload = "metadata";
  //          video.onloadedmetadata = () => {
  //            // Get video duration
  //            const duration = Math.round(video.duration);

  //            // Dispatch action to store video file, duration, and thumbnail
  //            dispatch(
  //              setPostFile({
  //                type: "video",
  //                file: files,
  //                duration: duration,
  //              })
  //            );

  //            // Clean up
  //            URL.revokeObjectURL(videoURL);
  //          };

  //          video.src = videoURL;

  //        }else{
  //         toastError("Video file size exceeds the limit of 50MB.");
  //         return;
  //        }

  //     }
  //   } else {
  //     // Handle the case where no file is selected
  //   }
  // };

  const handlePostChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      dispatch(setPostFile(null));
      return;
    }

    const firstFile = files[0];

    console.log("first file", firstFile);
    console.log("files",files);

    if (firstFile.type.startsWith("image")) {
      // Process only images
      const imageFiles = files.filter((file) => file.type.startsWith("image"));
      dispatch(
        setPostFile({
          type: "image",
          files: imageFiles,
        })
      );
    } else if (firstFile.type.startsWith("video")) {
      // Process only the first video
      if (firstFile.size <= 50 * 1024 * 1024) {
        const videoURL = URL.createObjectURL(firstFile);

        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          const duration = Math.round(video.duration);
          dispatch(
            setPostFile({
              type: "video",
              file: firstFile,
              duration: duration,
            })
          );
          URL.revokeObjectURL(videoURL);
        };
        video.src = videoURL;
      } else {
        toastError("Video file size exceeds the limit of 50MB.");
      }
    } else {
      toastError("Unsupported file type.");
    }
  };


  useEffect(() => {
    if (file && isOpen) {
      navigate("/postPreview");
    }
  }, [file, isOpen, navigate]);

  useClickOutside(modalRef, () => setIsOpen(false));

  return (
    <div className={css.uploadWrapper}>
      <button
        className={css.uploadGalleryBtn}
        onClick={() => {
          dispatch(setPostFile(null));
          setIsOpen(true);
        }}
      >
        <BsPlusLg />
      </button>

      {/* Select Modal  */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${css.selectModal} md:max-w-sm md:mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className={css.selectCard}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.3 }}
              ref={modalRef}
            >
              <button type="button" onClick={() => postRef?.current.click()}>
                Select from Gallery
              </button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>

              <input
                ref={postRef}
                type="file"
                name="post"
                onChange={(e) => handlePostChange(e)}
                style={{ display: "none" }}
                accept="image/*, video/*"
                multiple
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadFromGallery;
