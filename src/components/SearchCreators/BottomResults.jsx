import React from "react";
import css from "./SearchCreators.module.scss";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { MagicMotion } from "react-magic-motion";
import ImageProfileComponent from "../ui/Image/ImageProfileComponent";
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

const BottomResults = ({ searchText, data }) => {
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
    <div className={css.searchResults}>
      <div className={css.divider}></div>
      {res?.slice(3).map((item, index) => (
        <div key={item.id} onClick={() => handleNavigate(item)}>
          <div className={css.item}>
            <div className={css.left}>
              <div className={css.img}>
                <ImageProfileComponent
                  src={
                    import.meta.env.VITE_PROFILE_PICTURE + item?.profile_picture
                  }
                  alt=""
                  radius="full"
                  width={"100%"}
                  height={42}
                  className="rounded-full"
                />
              </div>
              <div className={css.info}>
                <p>{item.name}</p>
                <span>{item.username}</span>
              </div>
            </div>
            <div className={css.right}>
              <Rating
                name="read-only"
                size="small"
                emptyIcon={
                  <StarBorderIcon
                    style={{ color: "rgba(255,255,255,0.8)" }}
                    color="#BDC5CD"
                    fontSize="inherit"
                  />
                }
                value={Number(item.rating)}
                readOnly
                precision={0.5}
              />
            </div>
          </div>
          {res?.length !== index + 1 && <div className={css.divider}></div>}
        </div>
      ))}
    </div>
  );
};

export default BottomResults;
