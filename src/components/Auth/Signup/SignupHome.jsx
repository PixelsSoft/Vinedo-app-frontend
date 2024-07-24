import React, { useEffect, useState } from "react";
import css from "./SignupHome.module.scss";
import logo from "../../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import signupBg from "../../../assets/signupBg.png";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import {
  useContinueWithGoogleMutation,
  useValidateTokenQuery,
} from "../../../services/api/authApi/authApi";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { Button } from "@nextui-org/react";
import { ClipLoader } from "react-spinners";
import { toastError } from "../../Toast/Toast";
import AdultModal from "../../Adult/Modals/LogoutModal/AdultModal";

const SignupHome = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const token = localStorage.getItem("vineo_authToken");
  const {
    data,
    isLoading: isLoadingValidate,
    isSuccess: isSuccessValidate,
    error: isErrorValidate,
  } = useValidateTokenQuery(null, {
    refetchOnMountOrArgChange: true,
    skip: !token,
  });
  const { user } = useSelector((store) => store.auth);
  const [show, setShow] = useState(false);
  const [signupWithGoogle, res] = useContinueWithGoogleMutation();
  const { isLoading, isSuccess, error } = res;
  const [isAdultModal, setIsAdultModal] = useState(false);

  const apiErrors = useApiErrorHandling(error);

  useEffect(()=>{
    if(apiErrors && error?.status === 422){
      toastError(apiErrors?.map((item)=> `${item}. `));
    }
  },[apiErrors]);

  const handleSigninWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      const { data: result } = await signupWithGoogle({
        token: res.access_token,
      });
     
      if (result?.success) {
        localStorage.setItem("vineo_authToken", result?.token);

        // Check If user has set username and rate
        const username = result?.user.username;
        const rate = result?.user.rate;
        if (!username || !rate) {
          navigate("/getStarted");
        } else {
          navigate("/profile");
        }
      }
    },
    onError: (error) =>
      toastError("Something went wrong! Try again later", error),
  });

  useEffect(() => {
    if (!token) {
      setShow(true);
    } else {
      if (!isLoadingValidate && isSuccessValidate) {
        navigate("/profile");
      } else if (!isLoadingValidate && isErrorValidate) {
        setShow(true);
        localStorage.removeItem("vineo_authToken");
      }
    }
  }, [data, isLoadingValidate, isErrorValidate, isSuccessValidate]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (isLoadingValidate) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "999",
          paddingBottom: "3rem",
          background:
            "linear-gradient(170.28deg, #292734 -9.44%, #000000 100%)",
        }}
      >
        <ClipLoader color="#3632FF" size={45} speedMultiplier={0.85} />
      </div>
    );
  }

  return (
    <>
      {show && (
        <div className="w-screen h-screen md:max-w-sm overflow-hidden flex justify-center items-center flex-col md:mx-auto">
          <div className={css.container}>
            <header>
              <img src={logo} alt="" />
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
                <p>Unleash Desire & Forge Instant Connections.</p>
                <span>
                  Unlock instant, passionate interactions effortlessly.
                </span>
              </div>

              {/* <div className={css.socials}>
            <div className={css.icon}>
              <FaFacebookF />
            </div>
            <div className={css.icon}>
              <FaGoogle />
            </div>
            <div className={css.icon}>
              <FaApple />
            </div>
          </div> */}

              <div className={css.signupWithGoogle}>
                <Button isLoading={isLoading} onClick={handleSigninWithGoogle}>
                  <FcGoogle fontSize={23} />
                  <span>Continue with Google</span>
                </Button>
              </div>

              <div className={css.divider}>
                <div className={css.line}></div>
                <p>or</p>
                <div className={css.line}></div>
              </div>

              <div className={css.buttons}>
                <button
                  onClick={() => navigate("/signup")}
                  className={css.firstBtn}
                >
                  Sign up with email
                </button>
                <p  >
                  Existing account?
                 
                   <Link  onClick={() => {
                  setIsAdultModal(true);
               
                }} > Log in</Link>
                </p>
                {/* Adult Modal  */}
        <AdultModal
          isAdultModal={isAdultModal}
          setAdultModal={setIsAdultModal}
        />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupHome;
