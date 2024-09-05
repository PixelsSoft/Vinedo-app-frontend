import React, { useState } from "react";
import css from "./Profile.module.scss";
import { FaPlus } from "react-icons/fa";
import ProfileTabs from "../Tabs/ProfileTabs";
import { useNavigate, useParams } from "react-router-dom";
import CoverPhoto from "./CoverPhoto";
import ProfilePicture from "./ProfilePicture";
import { useGetCreatorProfileQuery } from "../../../services/api/creatorsApi/creatorsApi";
import { NumericFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import ShareProfileModal from "../../Profile/Modals/ShareProfileModal/ShareProfileModal";
import BurgerMenuModal from "../../Profile/Modals/BurgerMenuModal/BurgerMenuModal";
import LogoutModal from "../../Profile/Modals/LogoutModal/LogoutModal";
import ConfirmModal from "../../CreatorsTool/ConfirmModal";
import DeleteAccountModal from "../../Profile/Modals/DeleteAccountModal/DeleteAccountModal";
import UnsubscribeModal from "../../Profile/Modals/UnsubscribeModal/UnsubscribeModal";

const CreatorProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [isShareProfileModal, setIsShareProfileModal] = useState(false);
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUnsubModal, setIsUnsubModal] = useState(false);

  const {
    data,
    isFetching: isLoading,
    error,
  } = useGetCreatorProfileQuery(username);
  
  


  return (
    <div className="w-screen bg-[#110e0f] min-h-screen md:max-w-sm overflow-x-hidden scrollbar-hide flex items-center flex-col md:mx-auto">
      <div className={css.container}>
        {/* Cover photo  */}
        <CoverPhoto
          data={data}
          isLoading={isLoading}
          setIsBurgerMenu={setIsBurgerMenu}
          isBurgerMenu={isBurgerMenu}
        />

        {/* Profile pic  */}
        <ProfilePicture data={data} isLoading={isLoading} />

        {/* Loading Content Loader  */}
        {isLoading && (
          <div className="w-full h-[48px] mt-6 flex items-center justify-center">
            <ClipLoader color="#3632FF" size={30} speedMultiplier={0.95} />
          </div>
        )}

        {/* Likes | Subscribers | Rating  */}
        <div className={css.likes}>
          <div className={css.item}>
            <p>{data?.likes}</p>
            <span>{data && "Likes"}</span>
          </div>
          <div className={css.item}>
            <p>{data?.followers}</p>
            <span>{data && "Subscribers"}</span>
          </div>
          <div className={css.item}>
            {isLoading ? <p></p> : data?.rating ? data?.rating : "0.0"}
            <span>{data && "Rating"}</span>
          </div>
        </div>

        {/* Profile Bio  */}
        <div className={css.profileBio}>
          {data?.user?.description ? (
            <span>{data?.user?.description}</span>
          ) : (
            !isLoading && <span></span>
          )}
        </div>

        {/* Buttons | Subscribe | Unsubscribe | Share Profile  */}
        <div className={css.profileBtns}>
          {
            <>
              {!isLoading && data?.isSubscribed ? (
                <button onClick={() => setIsUnsubModal(true)}>
                  Unsubscribe
                </button>
              ) : (
                !isLoading && (
                  <button
                    className={css.subscribeBtn}
                    onClick={() => navigate(`/subscription/${data?.user?.id}`)}
                  >
                    <p>Subscribe</p>
                    <span>
                      <NumericFormat
                        displayType="text"
                        value={data?.user?.rate}
                        thousandSeparator=","
                        thousandsGroupStyle="lakh"
                      />
                      /month
                    </span>
                  </button>
                )
              )}

              {!isLoading && (
                <button onClick={() => setIsShareProfileModal(true)}>
                  Share Profile
                </button>
              )}
            </>
          }
        </div>

        {/* Tabs  */}
        <ProfileTabs
          data={data?.user?.posts}
          isLoading={isLoading}
          isSubscribed={data?.isSubscribed}
          creator={data?.user}
          imageCount={data?.imageCount}
          videoCount={data?.videoCount}
        />

        {/* Burger Menu Modal  */}
        <BurgerMenuModal
          isBurgerMenu={isBurgerMenu}
          setIsBurgerMenu={setIsBurgerMenu}
          setIsLogoutModal={setIsLogoutModal}
          setIsDeleteModal={setIsDeleteModal}
        />

        {/* Account Delete Confirmation Modal  */}
        <DeleteAccountModal
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
        />

        {/* Share Profile Modal  */}
        <ShareProfileModal
          isShareProfileModal={isShareProfileModal}
          setIsShareProfileModal={setIsShareProfileModal}
          username={data?.user?.username}
        />

        {/* Logout Modal  */}
        <LogoutModal
          isLogoutModal={isLogoutModal}
          setIsLogoutModal={setIsLogoutModal}
        />

        {/* Unsubscribe Confirmation Modal  */}
        <UnsubscribeModal
          isConfirmModal={isUnsubModal}
          setIsConfirmModal={setIsUnsubModal}
          creatorId={data?.user?.id}
        />
      </div>
    </div>
  );
};

export default CreatorProfile;
