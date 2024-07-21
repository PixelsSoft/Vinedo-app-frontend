import React, { useState } from 'react'
import ImageProfileComponent from '../../ui/Image/ImageProfileComponent';
import ProfilePicSkeleton from '../Skeletons/ProfilePicSkeleton';
import { FaPlus } from "react-icons/fa";
import UploadProfileModal from '../Modals/UploadProfileModal/UploadProfileModal';
import css from "./UserProfile.module.scss";
import { Skeleton } from '@mui/material';

const ProfilePicture = ({data, isLoading}) => {
    const [isProfileModal, setIsProfileModal] = useState(false);

  return (
    <>
      {/* Select Profile Photo Modal  */}
      <UploadProfileModal
        setIsProfileModal={setIsProfileModal}
        isProfileModal={isProfileModal}
        isLoadingData={isLoading}
      />

      <div className={css.profileWrap}>
        <div className={css.profile}>
          {isLoading ? (
            <ProfilePicSkeleton radius={"50%"} />
          ) : (
            <ImageProfileComponent
              src={
                import.meta.env.VITE_PROFILE_PICTURE +
                data?.user?.profile_picture
              }
              alt=""
              radius="full"
              width={"100%"}
              height={90}
              className="rounded-full"
            />
          )}

          <div className={css.plus} onClick={() => setIsProfileModal(true)}>
            <FaPlus />
          </div>
        </div>
        <div className={css.name}>
          {isLoading ? <Skeleton /> : <p>{data?.user?.name}</p>}

          {!isLoading && <span>@{data?.user?.username}</span>}
        </div>
      </div>
    </>
  );
}

export default ProfilePicture