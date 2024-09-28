import React, { useEffect, useState } from "react";
import css from "./UserProfile.module.scss";
import { FaPlus } from "react-icons/fa";
import ProfileTabs from "../Tabs/ProfileTabs";
import UploadFromGallery from "../Modals/UploadFromGallery/UploadFromGallery";
import { useNavigate } from "react-router-dom";
import BurgerMenuModal from "../Modals/BurgerMenuModal/BurgerMenuModal";
import LogoutModal from "../Modals/LogoutModal/LogoutModal";
import { useGetProfileDetailsQuery } from "../../../services/api/profileApi/profileApi";
import CoverPhoto from "./CoverPhoto";
import ProfilePicture from "./ProfilePicture";
import { useGetAllPostsByUserQuery } from "../../../services/api/postApi/postApi";
import ShareProfileModal from "../Modals/ShareProfileModal/ShareProfileModal";
import DeleteAccountModal from "../Modals/DeleteAccountModal/DeleteAccountModal";
import TermsServicesModal from "../Modals/TermsServicesModal/TermsServicesModal";
import PrivacyServicesModal from "../Modals/PrivacyServicesModal/PrivacyServicesModal";
import AdultModal from "../../Adult/Modals/LogoutModal/AdultModal";
import { IoCopyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isShareProfileModal, setIsShareProfileModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isTermsModal, setIsTermsModal] = useState(false);
  const [isPrivacyModal, setIsPrivacyModal] = useState(false);
  const [isAdultModal, setIsAdultModal] = useState(false);

  const {
    data,
    isFetching: isLoading,
    error,
  } = useGetProfileDetailsQuery(null, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    async () => {
      localStorage.setItem("data", data);
      console.log("in profile screen", data);
    };
  }, []);
  const { data: postsData, isLoading: isLoadingPosts } =
    useGetAllPostsByUserQuery();
  // console.log(data)
  const profileLink = `vinedo.app/@${data?.user.username}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  return (
    <div className="w-full h-full bg-[#110e0f] md:max-w-sm overflow-x-hidden scrollbar-hide flex items-center flex-col md:mx-auto ">
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

        {/* Likes | Subscribers | Rating  */}
        <div className={css.likes}>
          <div className={css.item}>
            <p>{data?.likes}</p>
            <span>Likes</span>
          </div>
          <div className={css.item}>
            <p>{data?.followers}</p>
            <span>Subscribers</span>
          </div>
          <div className={css.item}>
            {isLoading ? <p></p> : data?.rating ? data?.rating : "0.0"}
            <span>Rating</span>
          </div>
        </div>

        {/* Profile Bio  */}
        <div className={css.profileBio}>
          {data?.user?.description ? (
            <span>{data?.user?.description}</span>
          ) : (
            !isLoading && (
              <div className={css.addBio} onClick={() => navigate("/add/bio")}>
                <FaPlus />
                <span>Add profile bio</span>
              </div>
            )
          )}
        </div>
        <div className={css.copyToClipboard}>
          {!isCopied && (
            <p
              className="cursor-pointer text-blue-700 "
              onClick={() => navigate("/profile/links")}
            >
              Add Links
            </p>
          )}

          {isCopied ? (
            <>
              <span>vinedo.app/@{data?.user.username}</span>{" "}
              <TiTick className="text-green-600" fontSize={23} />
            </>
          ) : (
            ""
          )}
        </div>

        {/* Buttons | Edit Profile | Share Profile  */}
        <div className={css.profileBtns}>
          <button onClick={() => navigate("/profile/edit")}>
            Edit Profile
          </button>
          <button onClick={() => setIsShareProfileModal(true)}>
            Share Profile
          </button>
        </div>

        {/* Tabs  */}
        <ProfileTabs data={postsData} isLoading={isLoadingPosts} />

        {/* Upload From Gallery  */}
        {/* <UploadFromGallery /> */}

        {/* Burger Menu Modal  */}
        <BurgerMenuModal
          isBurgerMenu={isBurgerMenu}
          setIsBurgerMenu={setIsBurgerMenu}
          setIsLogoutModal={setIsLogoutModal}
          setIsDeleteModal={setIsDeleteModal}
          setIsTermsModal={setIsTermsModal}
          setIsPrivacyModal={setIsPrivacyModal}
          setIsAdultModal={setIsAdultModal}
        />

        {/* Share Profile Modal  */}
        <ShareProfileModal
          isShareProfileModal={isShareProfileModal}
          setIsShareProfileModal={setIsShareProfileModal}
          username={data?.user.username}
        />

        {/* Logout Modal  */}
        <LogoutModal
          isLogoutModal={isLogoutModal}
          setIsLogoutModal={setIsLogoutModal}
        />

        {/* Account Delete Confirmation Modal  */}
        <DeleteAccountModal
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
        />

        {/* Terms of services Modal  */}
        <TermsServicesModal
          isTermsModal={isTermsModal}
          setIsTermsModal={setIsTermsModal}
        />

        {/* Privacy Policy Modal  */}
        <PrivacyServicesModal
          isPrivacyModal={isPrivacyModal}
          setIsPrivacyModal={setIsPrivacyModal}
        />
        {/* Adult Modal  */}
        <AdultModal
          isAdultModal={isAdultModal}
          setAdultModal={setIsAdultModal}
        />
      </div>
    </div>
  );
};

export default UserProfile;
