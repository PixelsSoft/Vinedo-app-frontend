// import React from "react";
// import css from "./Payment.module.scss";
// import { useEffect } from "react";
// import { useState } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { useNavigate, useParams } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { useGetPaymentIntentQuery } from "../../../services/api/creatorsApi/creatorsApi";
// import { IoIosArrowBack } from "react-icons/io";

// const appearance = {
//   theme: "night",
//   labels: "floating",
//   variables: {
//     fontFamily: ' "Poppins", sans-serif',
//     fontLineHeight: "1.5",
//     borderRadius: "10px",
//     colorBackground: "#292734",
//     colorPrimary: "#3632ff",
//   },
//   // rules: {
//   //   ".Block": {
//   //     backgroundColor: "var(--colorBackground)",
//   //     boxShadow: "none",
//   //     padding: "12px",
//   //   },
//   //   ".Input": {
//   //     padding: "12px",
//   //   },
//   //   ".Input:disabled, .Input--invalid:disabled": {
//   //     color: "lightgray",
//   //   },
//   //   ".Tab": {
//   //     padding: "10px 12px 8px 12px",
//   //     border: "none",
//   //   },
//   //   ".Tab:hover": {
//   //     border: "none",
//   //     boxShadow:
//   //       "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
//   //   },
//   //   ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
//   //     border: "none",
//   //     backgroundColor: "#fff",
//   //     boxShadow:
//   //       "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
//   //   },
//   //   ".Label": {
//   //     fontWeight: "500",
//   //   },
//   // },
// };

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// const Payment = () => {
//   const navigate = useNavigate();
//   const { creatorId } = useParams();
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(true);
//   const { data, isLoading, error } = useGetPaymentIntentQuery(creatorId, {refetchOnMountOrArgChange: true});

//   useEffect(() => {
//     if (data) {
//       setClientSecret(data?.client_secret);

//       setTimeout(() => {
//         setLoading(false);
//       }, 1000);
//     }
//   }, [data]);

//   return (
//     <>
//       {/* Show Loading  */}
//       {loading && (
//         <div
//           style={{
//             width: "100%",
//             height: "100vh",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: "999",
//             position: "fixed",
//             top: "0",
//             left: "0",
//             overflow: "hidden",
//             background:
//               "linear-gradient(170.28deg, #292734 -9.44%, #000000 100%)",
//           }}
//         >
//           <ClipLoader color="#3632FF" size={43} speedMultiplier={0.9} />
//         </div>
//       )}

//       <div className="w-screen h-screen md:max-w-sm overflow-x-hidden scrollbar-hide flex justify-center items-center flex-col md:mx-auto">
//         <div className={css.wrapper}>
//           <header>
//             <IoIosArrowBack onClick={() => navigate(-1)} />
//             <p>Make Payment</p>
//           </header>
//           {stripePromise && clientSecret && (
//             <Elements
//               stripe={stripePromise}
//               options={{ clientSecret, appearance }}
//             >
//               <CheckoutForm
//                 clientSecret={clientSecret}
//                 isLoading={isLoading}
//                 creatorId={creatorId}
//               />
//             </Elements>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Payment;

import React, { useEffect, useState } from "react";
import css from "./Payment.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useGetPaymentIntentQuery } from "../../../services/api/creatorsApi/creatorsApi";
import { IoIosArrowBack } from "react-icons/io";
import useBrowserFocus from "../../../useBrowserVisibility";


const appearance = {
  theme: "night",
  labels: "floating",
  variables: {
    fontFamily: ' "Poppins", sans-serif',
    fontLineHeight: "1.5",
    borderRadius: "10px",
    colorBackground: "#292734",
    colorPrimary: "#3632ff",
  },
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const { creatorId } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const { data, isLoading, error } = useGetPaymentIntentQuery(creatorId, {
    refetchOnMountOrArgChange: true,
  });

  const isFocused = useBrowserFocus();

  useEffect(() => {
    if (data) {
      setClientSecret(data?.client_secret);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handlePrintScreen = (e) => {
      if (e.key === "PrintScreen") {
        alert("Screenshot detected!");
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handlePrintScreen);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handlePrintScreen);
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      document.body.classList.remove("blackout");
    } else {
      document.body.classList.add("blackout");
    }
  }, [isFocused]);

  return (
    <>
      {loading && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999",
            position: "fixed",
            top: "0",
            left: "0",
            overflow: "hidden",
            background:
              "linear-gradient(170.28deg, #292734 -9.44%, #000000 100%)",
          }}
        >
          <ClipLoader color="#3632FF" size={43} speedMultiplier={0.9} />
        </div>
      )}

      <div className="w-screen h-screen md:max-w-sm overflow-x-hidden scrollbar-hide flex justify-center items-center flex-col md:mx-auto">
        <div className={css.wrapper}>
          <header>
            <IoIosArrowBack onClick={() => navigate(-1)} />
            <p>Make Payment</p>
          </header>
          {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
              <CheckoutForm
                clientSecret={clientSecret}
                isLoading={isLoading}
                creatorId={creatorId}
              />
            </Elements>
          )}
        </div>
      </div>
      <style>
        {`
          body.blackout {
            background: black !important;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 9999;
          }
        `}
      </style>
    </>
  );
};

export default Payment;
