import React from 'react'
import css from "./Posts.module.scss";
import { CiImageOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const SubscribeCard = ({ creator,imageCount, videoCount }) => {
  const navigate = useNavigate();

  return (
    <div className={css.subscribeCardWrapper}>
      <header>
        <div className={css.left}>
          <div className={css.item}>
            <CiImageOn />
            <span>{imageCount}</span>
          </div>
          <div className="w-[2px] h-[2px] rounded-full bg-[#A1A3A7]"></div>
          <div className={css.item}>
            <CiVideoOn />
            <span>{videoCount}</span>
          </div>
        </div>

        <div className={css.right}>
          <CiLock />
        </div>
      </header>

      <button onClick={() => navigate(`/subscription/${creator?.id}`)}>
        Subscibe to see creator’s posts
      </button>
    </div>
  );
};

export default SubscribeCard