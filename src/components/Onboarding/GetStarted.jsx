import React,{useState,useEffect}from 'react'
import css from "./Onboarding.module.scss";
import logo from "../../assets/logo.svg";
import PrivacyServicesModal from '../Profile/Modals/PrivacyServicesModal/PrivacyServicesModal';
import AdultModal from '../Adult/Modals/LogoutModal/AdultModal';
import TocServicesModal from '../Profile/Modals/Toc/TocServicesModal';

const GetStarted = () => {
  const [isPrivacyModal, setIsPrivacyModal] = useState(false);
  const [isAdultModal, setIsAdultModal] = useState(false);
  const [isTocModal, setIsTocModal] = useState(false);
  useEffect(() => {
    setIsAdultModal(true);
  }, [])
  
  return (
    <div className={css.wrapper}>
      <div className={css.logo}>
        <img src={logo} alt="" />
      </div>

      <div className={css.content}>
        <p>Set Up Your Profile</p>
        <span>
          Personalize your experience by creating a profile. Share your
          interests, add a photo, and let others get to know the real you.
        </span>
        {/* Privacy Policy Modal  */}
        <PrivacyServicesModal
          isPrivacyModal={isPrivacyModal}
          setIsPrivacyModal={setIsPrivacyModal}
        />
        {/* Toc Modal  */}
        <TocServicesModal
          isTocModal={isTocModal}
          setIsTocModal={setIsTocModal}
        />
         {/* Adult Modal  */}
         <AdultModal
         setIsTocModal={setIsTocModal}
         setIsPrivacyModal={setIsPrivacyModal}
          isAdultModal={isAdultModal}
          setAdultModal={setIsAdultModal}
        />
      </div>
    </div>
  );
}

export default GetStarted