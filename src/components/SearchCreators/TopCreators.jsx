import React from "react";
import css from "./SearchCreators.module.scss";
import king from "../../assets/king.svg";
import { MagicMotion } from "react-magic-motion";
import ImageProfileComponent from "../ui/Image/ImageProfileComponent";
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TopCreators = ({ data }) => {
  const res = data?.users;
   const navigate = useNavigate();
   const { user } = useSelector((store) => store.auth);

   const handleNavigate = (item) => {
     // If search id is me. Redirect to my profile page
     if (user?.id === item.id) {
       navigate("/profile");
     } else {
       navigate(`/creators/${item.username}`);
     }
   };

  return (
    <div className={css.topCreators}>
      <div className={css.card}>
        {/* Third  */}
        <div className={css.item} onClick={() => handleNavigate(res[2] && res[2])}>
          <div className={css.profile}>
            <ImageProfileComponent
              src={
               res[2] && res[2]
                  ? import.meta.env.VITE_PROFILE_PICTURE +
                    res[2]?.profile_picture
                  : null
              }
              alt=""
              radius="full"
              width={"100%"}
              height={58}
              className="rounded-full"
            />
            <div className={css.rank}>3</div>
          </div>
          <div className={css.content}>
            {res[2] && res[2] ? (
              <>
                <p className={css.name}>{res[2].name}</p>
                <div className={css.points}>{res[2].views_count}</div>
                <div className={css.username}>{res[2].username}</div>
              </>
            ) : (
              <>
                <p className={css.name}>********</p>
                <div className={css.points}>*****</div>
                <div className={css.username}>***</div>
              </>
            )}
          </div>
        </div>

        {/* First  */}
        <div className={css.item} onClick={() => handleNavigate(res[0])}>
          <div className={css.profile}>
            <div className={css.kingImg}>
              <img src={king} alt="" />
            </div>

            <ImageProfileComponent
              src={
                res[0] && res[0]
                  ? import.meta.env.VITE_PROFILE_PICTURE +
                    res[0]?.profile_picture
                  : null
              }
              alt=""
              radius="full"
              width={"100%"}
              height={58}
              className="rounded-full"
            />
            <div className={css.rank}>1</div>
          </div>
          <div className={css.content}>
            {res[0] && res[0] ? (
              <>
                <p className={css.name}>{res[0].name}</p>
                <div className={css.points}>{res[0].views_count}</div>
                <div className={css.username}>{res[0].username}</div>
              </>
            ) : (
              <>
                <p className={css.name}>********</p>
                <div className={css.points}>*****</div>
                <div className={css.username}>***</div>
              </>
            )}
          </div>
        </div>

        {/* Second  */}
        <div className={css.item} onClick={() => handleNavigate(res[1])}>
          <div className={css.profile}>
            <ImageProfileComponent
              src={
               res[1] && res[1]
                  ? import.meta.env.VITE_PROFILE_PICTURE +
                    res[1]?.profile_picture
                  : null
              }
              alt=""
              radius="full"
              width={"100%"}
              height={58}
              className="rounded-full"
            />
            <div className={css.rank}>2</div>
          </div>
          <div className={css.content}>
            {res[1] && res[1] ? (
              <>
                <p className={css.name}>{res[1].name}</p>
                <div className={css.points}>{res[1].views_count}</div>
                <div className={css.username}>{res[1].username}</div>
              </>
            ) : (
              <>
                <p className={css.name}>********</p>
                <div className={css.points}>*****</div>
                <div className={css.username}>***</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCreators;
