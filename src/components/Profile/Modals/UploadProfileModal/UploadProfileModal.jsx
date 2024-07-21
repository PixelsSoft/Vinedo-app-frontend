import React, { useEffect, useRef, useState } from "react";
import css from "./UploadProfileModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import { HiOutlineUpload } from "react-icons/hi";
import { toastError } from "../../../Toast/Toast";
import { useUploadProfilePhotoMutation } from "../../../../services/api/profileApi/profileApi";
import { useApiErrorHandling } from "../../../../hooks/useApiErrors";
import { Spinner } from "@nextui-org/react";

const UploadProfileModal = ({
  isProfileModal,
  setIsProfileModal,
  isLoadingData,
}) => {
  const modalRef = useRef(null);
  const imageRef = useRef(null);

  const [uploadProfilePhoto, res] = useUploadProfilePhotoMutation();
  const { isLoading, error, isSuccess } = res;

  useEffect(() => {
    if (isSuccess) {
      setIsProfileModal(false);
    }
  }, [isSuccess]);

  const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (file) => {
    if (file) {
      let formData = new FormData();
      formData.append("profilePicture", file);

      await uploadProfilePhoto(formData);
    } else {
      toastError("Please select an image to upload.");
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files[0];
    if (files) {
      if (files.size <= 2 * 1024 * 1024) {
        handleSubmit(files);
      } else {
        // Invalid image size
        toastError("Please select an image smaller than 2 MB.");
        return;
      }
    } else {
    }
  };

  useClickOutside(modalRef, () => setIsProfileModal(false));
  return (
    <div className={css.ratingWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isProfileModal && (
          <motion.div
            className={`${css.selectModal} md:max-w-sm md:mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className={css.selectCard}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              ref={modalRef}
            >
              <p>Select profile picture!</p>
              <div
                className={css.uploadBox}
                onClick={() => !isLoading && imageRef?.current.click()}
              >
                {isLoading ? <Spinner size="sm" /> : <HiOutlineUpload />}
              </div>
              <button onClick={() => !isLoading && setIsProfileModal(false)}>
                Cancel
              </button>

              <input
                ref={imageRef}
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e)}
                style={{ display: "none" }}
                accept="image/*"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadProfileModal;
