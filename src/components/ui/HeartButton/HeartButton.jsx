import React, { useMemo, useRef, useState } from "react";
import "./HeartButton.scss";
import { FaHeart } from "react-icons/fa";

const HeartButton = ({ isLiked, handleClick, error, likes, setLikes }) => {
  const [liked, setLiked] = useState(isLiked);
  const inputRef = useRef();
  const [animate, setAnimate] = useState(false);

  useMemo(() => {
    if (error) {
      console.log(isLiked);
      if(isLiked){
        setLiked(true);
        setLikes(likes + 1);
      }else{
        setLiked(false);
        setLikes(likes - 1);
      }
      
    }
  }, [error]);

  const handleToggle = () => {

    // Dislike if already post is liked 
    if(liked){
      setLiked(false);
      setLikes(likes - 1);
      setAnimate(false);
    }else{

      // Like the post if not already liked 
      setLiked(true);
      setLikes(likes + 1);
      setAnimate(true);
    }

    handleClick();
  };

  return (
    <>
      <div
        className={`h-[40px] w-7 flex items-center justify-center ${
          animate ? "likedClass" : ""
        }`}
      >
        <input
          ref={inputRef}
          id="toggle-heart"
          type="checkbox"
          onClick={handleToggle}
          defaultChecked={liked}
        />
        <label
          htmlFor="toggle-heart"
          style={{ color: liked ? "#3632ff" : "" }}
        >
          <FaHeart />
        </label>
      </div>
    </>
  );
};

export default HeartButton;
