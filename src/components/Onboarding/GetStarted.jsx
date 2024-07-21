import React from 'react'
import css from "./Onboarding.module.scss";
import logo from "../../assets/logo.svg";

const GetStarted = () => {
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
      </div>
    </div>
  );
}

export default GetStarted