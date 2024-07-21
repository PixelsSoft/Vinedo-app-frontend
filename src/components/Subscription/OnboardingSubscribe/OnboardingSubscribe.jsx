import React, { useState } from "react";
import css from "./OnboardingSubscribe.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import signupBg from "../../../assets/subscribeBg.png";
import logo from "../../../assets/logo.svg";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { useGetCreatorDetailsByIdQuery } from "../../../services/api/creatorsApi/creatorsApi";
import { NumericFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";

const OnboardingSubscribe = () => {
  const navigate = useNavigate();
  const { creatorId } = useParams();
  const { data, isLoading } = useGetCreatorDetailsByIdQuery(creatorId);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="w-screen h-full md:max-w-sm scrollbar-hide overflow-x-hidden flex justify-center items-center flex-col md:mx-auto">
      <div className={css.container}>
        <header>
          <img src={logo} alt="" />
          {/* <FaBars />  */}
        </header>

        {/* Conditional rendering for background image */}
        <motion.div
          className={css.backgroundImage}
          style={{
            backgroundImage: `url(${signupBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        {/* This div is used to load the background image */}
        <div className={css.hiddenImage}>
          <img src={signupBg} onLoad={handleImageLoad} alt="" />
        </div>

        <div className={css.content}>
          <div className={css.heading}>
            <p>Subscribe to </p>
            <p>
              {isLoading ? (
                <ClipLoader color="#3632FF" size={20} speedMultiplier={0.95} />
              ) : (
                data?.user?.username
              )}
            </p>
            <span>
              Support your favorite people on vinedo for bonus content{" "}
            </span>
          </div>

          <div className={css.subscribeContent}>
            <p>By unsubscribing you won’t </p>
            <ul>
              <li>
                <div className={css.icon}>
                  <IoMdClose />
                </div>
                <span>see user’s posts</span>
              </li>
              <li>
                <div className={css.icon}>
                  <IoMdClose />
                </div>
                <span>rate user’s content</span>
              </li>
              <li>
                <div className={css.icon}>
                  <IoMdClose />
                </div>
                <span>participate in user’s activiy</span>
              </li>
            </ul>
            <div className={css.buttons}>
              <button
                disabled={isLoading}
                onClick={() => navigate(`/payment/${data?.user?.id}`)}
              >
                Subscribe
              </button>
              <button onClick={() => navigate(-1)}>Cancel</button>
            </div>
          </div>

          <div className={css.footer}>
            <p>
              By clicking below to make this purchase, you agree to be bond by
              the <Link to={"/"}>vinedo.</Link> cancel anytime Auto- renews
              monthly.
            </p>
            <button
              disabled={isLoading}
              onClick={() => navigate(`/payment/${data?.user?.id}`)}
            >
              <p>Subscribe</p>
              <span>
                <NumericFormat
                  displayType="text"
                  value={`${data?.user?.rate}`}
                  thousandSeparator=","
                  thousandsGroupStyle="lakh"
                  className="text-white"
                />
                /month
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSubscribe;
