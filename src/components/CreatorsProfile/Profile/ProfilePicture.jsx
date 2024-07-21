import React, { useState } from 'react'
import ImageProfileComponent from '../../ui/Image/ImageProfileComponent';
import ProfilePicSkeleton from '../Skeletons/ProfilePicSkeleton';
import { FaPlus } from "react-icons/fa";
import css from "./Profile.module.scss";
import { Skeleton } from '@mui/material';

const ProfilePicture = ({data, isLoading}) => {

  return (
    <>

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