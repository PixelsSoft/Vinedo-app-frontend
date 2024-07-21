import React, { useMemo, useRef, useState } from "react";
import css from "./EditUserProfile.module.scss";
import ImageProfileComponent from "../../ui/Image/ImageProfileComponent";
import ProfilePicSkeleton from "../../Profile/Skeletons/ProfilePicSkeleton";
import { FaPlus } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { toastError, toastSuccess } from "../../Toast/Toast";
import { useStoreProfilePictureMutation } from "../../../services/api/authApi/authApi";

const ProfilePicture = ({ isLoading, data, refetch }) => {
  const profileRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  // Profile Picture request
  const [storeProfilePic, res] = useStoreProfilePictureMutation();
  const { isLoading: isLoadingProfile, error, isSuccess } = res;

  useMemo(()=>{
    if(isSuccess){
      refetch();
    }
  },[isSuccess]);

  const apiErrors = useApiErrorHandling(error);

  const handleSubmit = async (file) => {
    if (file) {
      let formData = new FormData();
      formData.append("profilePicture", file);

      const { data } = await storeProfilePic(formData);
    } else {
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files[0];
    if (files) {
      if (files.size <= 2 * 1024 * 1024) {
        const reader = new FileReader();

        reader.onloadend = () => {
          // Set the image preview URL
          setImagePreview(reader.result);
        };

        reader.readAsDataURL(files);

        handleSubmit(files);
      } else {
        // Invalid image size
        toastError("Please select an image smaller than 2 MB.");
        return;
      }
    } else {
    }
  };

  return (
    <div className={css.profilePicWrap}>
      <div className={css.profile} onClick={() => profileRef.current.click()}>
        {isLoading ? (
          <ProfilePicSkeleton radius={"50%"} />
        ) : (
          <ImageProfileComponent
            src={
              imagePreview
                ? imagePreview
                : import.meta.env.VITE_PROFILE_PICTURE +
                  data?.user?.profile_picture
            }
            alt=""
            radius="full"
            width={"100%"}
            height={90}
            className="rounded-full"
          />
        )}

        <input
          ref={profileRef}
          type="file"
          name="image"
          onChange={(e) => handleImageChange(e)}
          style={{ display: "none" }}
          accept="image/*"
        />

        <div className={css.camera}>
          <CiCamera />
        </div>

        <div className={css.plus}>
          <FaPlus />
        </div>
      </div>

      <p>Change Photo</p>
    </div>
  );
};

export default ProfilePicture;
