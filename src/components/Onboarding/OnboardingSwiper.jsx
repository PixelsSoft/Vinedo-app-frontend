import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import css from "./Onboarding.module.scss";
import EnterName from "./EnterName";
import UploadPicture from "./UploadPicture";
import SetRate from "./SetRate";
import playBtn from "../../assets/play-button.svg";
import GetStarted from "./GetStarted";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useStoreProfilePictureMutation,
  useStoreRateMutation,
  useStoreUserNameMutation,
} from "../../services/api/authApi/authApi";
import { Button } from "@nextui-org/react";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      position: "absolute",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: "absolute",
    };
  },
};

const swipeConfidenceThreshold = 100;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const OnboardingSwiper = () => {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const rateRef = useRef();
  const imageRef = useRef();
  const [[page, direction], setPage] = useState([0, 0]);
  const [userName, setUserName] = useState("");
  const [rate, setRate] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

  // User name request
  const [storeUserName, res1] = useStoreUserNameMutation();
  const {
    isLoading: isLoadingUserName,
    error: errorUserName,
    isSuccess: successUserName,
  } = res1;

  // Profile Picture request
  const [storeProfilePic, res2] = useStoreProfilePictureMutation();
  const {
    isLoading: isLoadingProfile,
    error: errorProfile,
    isSuccess: successProfile,
  } = res2;

  // Rate request
  const [storeRate, res3] = useStoreRateMutation();
  const {
    isLoading: isLoadingRate,
    error: errorRate,
    isSuccess: successRate,
  } = res3;

  const paginate = (newDirection) => {
    const nextPage = page + newDirection;
    if (nextPage >= 0 && nextPage <= 3) {
      setPage([nextPage, newDirection]);
    }
  };

  const renderData = [
    <GetStarted />,
    <EnterName
      userNameRef={userNameRef}
      paginate={paginate}
      userName={userName}
      setUserName={setUserName}
      errorUserName={errorUserName}
      successUserName={successUserName}
      storeUserName={storeUserName}
    />,
    <UploadPicture
      imageRef={imageRef}
      image={image}
      setImage={setImage}
      imagePreview={imagePreview}
      setImagePreview={setImagePreview}
      paginate={paginate}
      errorProfile={errorProfile}
      successProfile={successProfile}
      storeProfilePic={storeProfilePic}
    />,
    <SetRate
      rateRef={rateRef}
      paginate={paginate}
      rate={rate}
      setRate={setRate}
      errorRate={errorRate}
      successRate={successRate}
      storeRate={storeRate}
    />,
  ];

  const dataIndex = wrap(0, renderData.length, page);

  const handlePaginate = () => {};

  return (
    <>
      <div className="w-screen h-screen md:max-w-sm overflow-hidden flex justify-center items-center flex-col md:mx-auto">
        <div className={css.containerOnBoarding}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  (page === 0 || page === 2) &&
                    !isLoadingUserName &&
                    !isLoadingProfile &&
                    paginate(1);
                  page === 1 && userNameRef && userNameRef.current.click();
                } else if (swipe > swipeConfidenceThreshold) {
                  !isLoadingUserName && !isLoadingProfile && paginate(-1);
                }
              }}
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {renderData[dataIndex]}
            </motion.div>
          </AnimatePresence>

          <div className="z-10 flex w-full absolute left-0 right-0 bottom-48 space-x-2 items-center justify-center mx-auto mb-5 mt-36">
            {Array(4)
              .fill(null)
              .map((item, index) =>
                page === index ? (
                  <div
                    key={index}
                    className="w-[20px] h-[8px] bg-[#3632FF] rounded-full cursor-pointer transition-all"
                  ></div>
                ) : (
                  <div
                    key={index}
                    onClick={() => {
                      if (!isLoadingUserName && !isLoadingProfile) {
                        page === 0 ? paginate(1) : index < page && paginate(-1);
                      }
                    }}
                    className="w-[7px] h-[8px] bg-white rounded-full cursor-pointer transition-all"
                  ></div>
                )
              )}
          </div>

          {page === 0 && (
            <button
              onClick={() => paginate(1)}
              disabled={page === 4 - 1}
              className={css.getStartedBtn}
            >
              Get Started
            </button>
          )}

          {/* Username Page button  */}
          {page === 1 && (
            <div className={css.skipNextBtns}>
              <Button
                isLoading={isLoadingUserName}
                onClick={() => userNameRef && userNameRef.current.click()}
                type="button"
                size="lg"
                style={{ marginLeft: "auto" }}
                className={`${css.next} bg-transparent h-16 transition-none`}
              >
                {isLoadingUserName ? "" : <img src={playBtn} alt="" />}
              </Button>
            </div>
          )}

          {page === 2 && (
            <div className={css.skipNextBtns}>
              <button
                type="button"
                onClick={() => paginate(1)}
                className={css.skip}
              >
                Skip
              </button>
              <Button
                isLoading={isLoadingProfile}
                type="button"
                size="lg"
                onClick={() => imageRef && imageRef.current.click()}
                className={`${css.next} bg-transparent h-16 transition-none`}
              >
                {isLoadingProfile ? "" : <img src={playBtn} alt="" />}
              </Button>
            </div>
          )}

          {page === 3 && (
            <Button
              isLoading={isLoadingRate}
              onClick={() => rateRef && rateRef.current.click()}
              className={css.getStartedBtn}
              type="button"
            >
              Finsih
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardingSwiper;
