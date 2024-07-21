import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../services/slices/auth/authSlice";
import { ClipLoader } from "react-spinners";
import { useValidateTokenQuery } from "../../services/api/authApi/authApi";

const Protected = ({ Component }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const {
    data: token,
    isLoading,
    isSuccess,
    error,
  } = useValidateTokenQuery(null, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    const authToken = localStorage.getItem("vineo_authToken");
    if (!authToken) {
      navigate("/login");
    } else {
      // Check for token validity
      if (!isLoading) {
        dispatch(setAuth(token?.user));
        if (!isLoading && isSuccess) {

          // Check If user has set username and rate 
          const username = token?.user.username;
          const rate = token?.user.rate;
          if(!username || !rate){
            navigate("/getStarted");
            setShow(true);
          }else{
            setShow(true);
          }
        } else if (!isLoading && error) {
          setShow(false);
          navigate("/login");
        }
      }
    }
  }, [token, isSuccess, error, isLoading]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "999",
          paddingBottom:"3rem",
          background:
            "linear-gradient(170.28deg, #292734 -9.44%, #000000 100%)",
        }}
      >
        <ClipLoader color="#3632FF" size={45} speedMultiplier={0.85} />
      </div>
    );
  }

  return show && <Component />;
};

export default Protected;
