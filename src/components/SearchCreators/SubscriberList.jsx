// import React from "react";
// import css from "./SearchCreators.module.scss";

// import ImageProfileComponent from "../ui/Image/ImageProfileComponent";
// import {useNavigate} from "react-router-dom"
// import {useSelector} from "react-redux"

// const SubscriberList = ({ searchText, data }) => {
//   const res = data?.users;
//    const navigate = useNavigate();
//     const { user } = useSelector((store) => store.auth);

//      const handleNavigate = (item) => {
//        // If search id is me. Redirect to my profile page
//        if (user?.id === item.id) {
//          navigate("/profile");
//        } else {
//          navigate(`/creators/${item.username}`);
//        }
//      };

//   return (
//     <div className={css.searchResults}>

//       {res?.slice(3).map((item, index) => (
//         <div style={{
//           //  width: 60,
//           // backgroundColor:"red",
//           flexDirection:"column",
//           alignItems: "center",
//          justifyContent:"center",
//           alignContent:"center",
//           cursor: "pointer",}}>
//           <div style={{width:42, height:42,  backgroundColor:"yellew"}}>
//           <ImageProfileComponent
//                    src={
//                      import.meta.env.VITE_PROFILE_PICTURE + item?.profile_picture
//                    }
//                    alt=""

//                    radius="full"
//                    width={42}
//                   height={42}
//                  className="rounded-full"
//                  />
//             </div>

//            <div style={{justifyContent:"center",alignItems:"center", display: "flex",
//           flexDirection: "column",
//           gap: 2}}>
//                  {/* <p style={{ color: "#ffffff", fontSize:14}}>{item.name}</p> */}
//                  <p style={{ color: "#ffffff", fontSize:14, }}>jkasbck ha ciabcsi</p>
//                  <span style={{ color: "#A1A3A7", fontSize:10}}>{item.username}</span>
//                </div>
//           </div>
//         // <div key={item.id} style={{backgroundColor:"red"}} onClick={() => handleNavigate(item)}>
//         //   <div className={css.item} >
//         //     <div className={css.left} style={{flexDirection:"column", alignItems:"center"}}
//         //     >
//         //       <div className={css.img}>
//         //         <ImageProfileComponent
//         //           src={
//         //             import.meta.env.VITE_PROFILE_PICTURE + item?.profile_picture
//         //           }
//         //           alt=""
//         //           radius="full"
//         //           width={"100%"}
//         //           height={42}
//         //           className="rounded-full"
//         //         />
//         //       </div>
//         //       <div className={css.info}>
//         //         <p>{item.name}</p>
//         //         <span>{item.username}</span>
//         //       </div>
//         //     </div>

//         //   </div>

//         // </div>
//       ))}
//     </div>
//   );
// };

// export default SubscriberList;
import React from "react";
import ImageProfileComponent from "../ui/Image/ImageProfileComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import css from "./SearchCreators.module.scss";
const SubscriberList = ({ searchText, data }) => {
  const res = data;
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const handleNavigate = (item) => {
    if (user?.id === item.id) {
      navigate("/profile");
    } else {
      navigate(`/creators/${item.username}`);
    }
  };

  return (
    <div
      className={`${css.wrapper} md:max-w-sm md:mx-auto`}
      style={{ width: "100vw" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          // margin: '20px 0'
        }}
      >
        <div
          style={{
            flex: 1,
            borderBottom: "1px solid #3632ff",
            margin: "0 15px",
          }}
        ></div>
        <span style={{ color: "#3632ff", fontSize: 14 }}>Subscriptions</span>
        <div
          style={{
            flex: 1,
            borderBottom: "1px solid #3632ff",
            margin: "0 15px",
          }}
        ></div>
      </div>
      {res?.length === 0 ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <p style={{ color: "white", fontSize: 12 }}>
            You haven't subscribed to anyone yet
          </p>
        </div>
      ):
      <div style={{paddingTop:8}}>

      </div>
      }
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          justifyContent:"center",
          paddingBottom: 8,
          paddingRight:8,
          paddingLeft:8,
     
          WebkitOverflowScrolling: "touch", // Enables momentum scrolling on iOS
          scrollbarWidth: "none", // Hides scrollbar for Firefox
          msOverflowStyle: "none", // Hides scrollbar for IE and Edge
          width: "100%", // Ensure the container has a width
        }}
        className="hide-scrollbar"
      >
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
            }
          `}
        </style>
        {res?.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginRight: 20,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate(item)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
                width: 42,
                height: 42,
                borderRadius: "100px",
                overflow: "hidden",
              }}
            >
              <ImageProfileComponent
                src={
                  import.meta.env.VITE_PROFILE_PICTURE + item?.profile_picture
                }
                alt=""
                radius="full"
                className="rounded-full"
              />
            </div>

            <p style={{ color: "#ffffff", fontSize: 12 }}>{item?.name}</p>
            {/* <span style={{ color: "#A1A3A7", fontSize: 10 }}>
              {item?.username}
            </span> */}
          </div>
        ))}
      </div>
      <div className={css.divider}></div>
    </div>
  );
};

export default SubscriberList;
