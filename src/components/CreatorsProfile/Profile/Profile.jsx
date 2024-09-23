import React, { useEffect, useState } from "react";
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
import { useGetLinksQuery } from "../../../services/api/profileApi/profileApi";

const CreatorProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [isShareProfileModal, setIsShareProfileModal] = useState(false);
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUnsubModal, setIsUnsubModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Fetch creator profile data
  const {
    data: creatorProfileData, // Renamed this to avoid conflicts
    isFetching: isLoading,
    error,
  } = useGetCreatorProfileQuery(username);

  // Fetch links list
  const { data: linksData } = useGetLinksQuery(creatorProfileData?.user?.id, {
    skip: !creatorProfileData?.user?.id, // Fetch only when the ID is available
    refetchOnMountOrArgChange: false,
  });

  const [linksList, setLinksList] = useState([]);

  useEffect(() => {
    if (linksData?.data) {
      setLinksList(linksData.data);
    }
  }, [linksData]);

  console.log('Creator Profile:', creatorProfileData);
  console.log('Links List:', linksList);

  return (
    <div className="w-full bg-[#110e0f] min-h-screen md:max-w-sm overflow-x-hidden scrollbar-hide flex items-center flex-col md:mx-auto">
      <div className={css.container}>
        {/* Cover photo */}
        <CoverPhoto
          data={creatorProfileData}
          isLoading={isLoading}
          setIsBurgerMenu={setIsBurgerMenu}
          isBurgerMenu={isBurgerMenu}
        />

        {/* Profile pic */}
        <ProfilePicture data={creatorProfileData} isLoading={isLoading} />

        {/* Loading Content Loader */}
        {isLoading && (
          <div className="w-full h-[48px] mt-6 flex items-center justify-center">
            <ClipLoader color="#3632FF" size={30} speedMultiplier={0.95} />
          </div>
        )}

        {/* Likes | Subscribers | Rating */}
        <div className={css.likes}>
          <div className={css.item}>
            <p>{creatorProfileData?.likes}</p>
            <span>{creatorProfileData && "Likes"}</span>
          </div>
          <div className={css.item}>
            <p>{creatorProfileData?.followers}</p>
            <span>{creatorProfileData && "Subscribers"}</span>
          </div>
          <div className={css.item}>
            {isLoading ? <p></p> : creatorProfileData?.rating ? creatorProfileData?.rating : "0.0"}
            <span>{creatorProfileData && "Rating"}</span>
          </div>
        </div>

        {/* Profile Bio */}
        <div className={css.profileBio}>
          {creatorProfileData?.user?.description ? (
            <span>{creatorProfileData?.user?.description}</span>
          ) : (
            !isLoading && <span></span>
          )}
        </div>

        {linksList.length > 0 && (
          <div className="flex justify-center">
            <div className={css.copyToClipboard}>
              {!isCopied && (
                <p
                  className="cursor-pointer text-blue-700 "
                  onClick={() =>
                    navigate(`/creators/${creatorProfileData.user.username}/${creatorProfileData.user.id}`)
                  }
                >
                  Link goes here
                </p>
              )}

              {isCopied ? (
                <>
                  <span>vinedo.app/@{creatorProfileData?.user.username}</span>{" "}
                  <TiTick className="text-green-600" fontSize={23} />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        {/* Buttons | Subscribe | Unsubscribe | Share Profile */}
        <div className={css.profileBtns}>
          {!isLoading && creatorProfileData?.isSubscribed ? (
            <button onClick={() => setIsUnsubModal(true)}>Unsubscribe</button>
          ) : (
            !isLoading && (
              <button
                className={css.subscribeBtn}
                onClick={() => navigate(`/subscription/${creatorProfileData?.user?.id}`)}
              >
                <p>Subscribe</p>
                <span>
                  <NumericFormat
                    displayType="text"
                    value={creatorProfileData?.user?.rate}
                    thousandSeparator=","
                    thousandsGroupStyle="lakh"
                  />
                  /month
                </span>
              </button>
            )
          )}

          {!isLoading && (
            <button onClick={() => setIsShareProfileModal(true)}>Share Profile</button>
          )}
        </div>

        {/* Tabs */}
        <ProfileTabs
          data={creatorProfileData?.user?.posts}
          isLoading={isLoading}
          isSubscribed={creatorProfileData?.isSubscribed}
          creator={creatorProfileData?.user}
          imageCount={creatorProfileData?.imageCount}
          videoCount={creatorProfileData?.videoCount}
        />

        {/* Burger Menu Modal */}
        <BurgerMenuModal
          isBurgerMenu={isBurgerMenu}
          setIsBurgerMenu={setIsBurgerMenu}
          setIsLogoutModal={setIsLogoutModal}
          setIsDeleteModal={setIsDeleteModal}
        />

        {/* Account Delete Confirmation Modal */}
        <DeleteAccountModal
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
        />

        {/* Share Profile Modal */}
        <ShareProfileModal
          isShareProfileModal={isShareProfileModal}
          setIsShareProfileModal={setIsShareProfileModal}
          username={creatorProfileData?.user?.username}
        />

        {/* Logout Modal */}
        <LogoutModal
          isLogoutModal={isLogoutModal}
          setIsLogoutModal={setIsLogoutModal}
        />

        {/* Unsubscribe Confirmation Modal */}
        <UnsubscribeModal
          isConfirmModal={isUnsubModal}
          setIsConfirmModal={setIsUnsubModal}
          creatorId={creatorProfileData?.user?.id}
        />
      </div>
    </div>
  );
};

export default CreatorProfile;
