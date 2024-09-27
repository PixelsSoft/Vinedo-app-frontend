// import React, { useEffect, useMemo, useState } from 'react'
// import css from "./ViewPost.module.scss";
// import views from "../../../assets/views.svg"
// import star from "../../../assets/star.svg";
// import starFilled from "../../../assets/starFilled.svg";
// import HeartButton from '../../ui/HeartButton/HeartButton';
// import { useLikeAPostMutation } from '../../../services/api/postApi/postApi';
// import voteFilled from "../../../assets/voteFilled.svg";
// import { FaStar } from "react-icons/fa";

// import { FaRegStar } from "react-icons/fa";

// const BottomPostActions = ({ data, setIsRatingModal, postId }) => {
//   const [likes, setLikes] = useState(data?.likes);
//   const [likePost, res] = useLikeAPostMutation(postId);
//   const { isSuccess, error } = res;
//   const handleLikePost = async () => {
//     await likePost(postId);
//   };

//   return (
    




//     <div 
//     style={{}} 
//     className={[css.bottomActionsWrap,]}
//     >
//       <div className={css.line}></div>
//       <div className={css.items}>
//         <div className="flex-1 -mt-1.5">
//           <div className={css.item}>
//             <HeartButton
//               isLiked={data?.isLiked}
//               handleClick={handleLikePost}
//               likes={likes}
//               setLikes={setLikes}
//               error={error}
//               />
//             <span className="-mt-2.5 animate-none transform-none">{likes}</span>
//           </div>
//         </div>

//         <div className="flex-1">
//           <div className={css.item}>
//             <img style={{ transform: "scale(1.04)" }} src={views} alt="" />
//             <span>{data?.views}</span>
//           </div>
//         </div>

//         <div className="flex-1 flex">
//           <button
//             disabled={data?.isRated}
//             className={css.item}
//             onClick={() => setIsRatingModal(true)}
//             >
//             {/* {data?.isRated  ?
//            <label
//            //  htmlFor="toggle-heart"
//            style={{ color: "#FFFF00" }}
//            >
//            <FaStar />
//            </label>
//            :
//            <label
//            //  htmlFor="toggle-heart"
//            style={{ color: "#ffffff" }}
//            >
//            <FaRegStar />
//            </label>
//           } */}
//             <img src={data?.isRated ? starFilled : star} alt="" />
//             <span>
//               {data?.rating ? parseFloat(data.rating).toFixed(1) : "0.0"}
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default BottomPostActions


import React, { useEffect, useState } from 'react';
import css from "./ViewPost.module.scss";
import views from "../../../assets/views.svg";
import star from "../../../assets/star.svg";
import starFilled from "../../../assets/starFilled.svg";
import HeartButton from '../../ui/HeartButton/HeartButton';
import { useLikeAPostMutation } from '../../../services/api/postApi/postApi';
import { FaStar, FaRegStar } from "react-icons/fa";

const BottomPostActions = ({ data, setIsRatingModal, postId }) => {
  const [likes, setLikes] = useState(data?.likes);
  const [likePost, res] = useLikeAPostMutation(postId);
  const { error } = res;
  
  // State to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLikePost = async () => {
    await likePost(postId);
  };

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={css.bottomActionsWrap}
      style={{
        width: windowWidth < 768 ? '100%' : '24rem', // Adjust the breakpoint as needed
      }}
    >
      <div className={css.line}></div>
      <div className={css.items}>
        <div className="flex-1 -mt-1.5">
          <div className={css.item}>
            <HeartButton
              isLiked={data?.isLiked}
              handleClick={handleLikePost}
              likes={likes}
              setLikes={setLikes}
              error={error}
            />
            <span className="-mt-2.5 animate-none transform-none">{likes}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className={css.item}>
            <img style={{ transform: "scale(1.04)" }} src={views} alt="" />
            <span>{data?.views}</span>
          </div>
        </div>

        <div className="flex-1 flex">
          <button
            disabled={data?.isRated}
            className={css.item}
            onClick={() => setIsRatingModal(true)}
          >
            <img src={data?.isRated ? starFilled : star} alt="" />
            <span>
              {data?.rating ? parseFloat(data.rating).toFixed(1) : "0.0"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomPostActions;
