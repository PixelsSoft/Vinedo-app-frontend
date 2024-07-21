import React from 'react'
import css from "./EditUserProfile.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProfilePicture from './ProfilePicture';
import Fields from './Fields';
import { useGetProfileDetailsQuery } from '../../../services/api/profileApi/profileApi';

const EditUserProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, error,refetch } = useGetProfileDetailsQuery(null,{refetchOnMountOrArgChange: true});

  return (
    <div className={css.wrapper}>
      <header>
        <IoIosArrowBack onClick={() => navigate(-1)} />
        <p>Edit Profile</p>
      </header>

      {/* Profile  */}
      <ProfilePicture data={data} isLoading={isLoading} refetch={refetch} />

      {/* Input Fields  */}
      <Fields data={data} isLoading={isLoading} />
    </div>
  );
}

export default EditUserProfile