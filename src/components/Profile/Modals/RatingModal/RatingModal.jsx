import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./RatingModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useRateAPostMutation } from "../../../../services/api/postApi/postApi";
import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useApiErrorHandling } from "../../../../hooks/useApiErrors";
import { toastSuccess } from "../../../Toast/Toast";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "react-simple-star-rating";

const RatingModal = ({ isRatingModal, setIsRatingModal }) => {
  const modalRef = useRef(null);
  const [ratingValue, setRatingValue] = useState(3);
  const { postId } = useParams();
  const [rateAPost, res] = useRateAPostMutation();
  const { isLoading, error, isSuccess } = res;

  const handleRateAPost = async () => {
    await rateAPost({ postId: postId, rating: ratingValue });
  };

  const apiErrors = useApiErrorHandling(error);

  useMemo(() => {
    if (isSuccess) {
      setIsRatingModal(false);
      toastSuccess("Rating submitted. Thanks!");
    }
  }, [isSuccess]);

  useClickOutside(modalRef, () => !isLoading && setIsRatingModal(false));

  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  return (
    <div className={css.ratingWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isRatingModal && (
          <motion.div
            className={`${css.selectModal} md:max-w-sm md:mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className={css.selectCard}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              ref={modalRef}
            >
              <p>Rate your experience!</p>
              <div>
                {/* <Rating
                  name="simple-controlled"
                  size="large"
                  emptyIcon={
                    <StarBorderIcon
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      color="#BDC5CD"
                      fontSize="inherit"
                    />
                  }
                  value={ratingValue}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                /> */}

                <Rating
                  onClick={handleRating}
                  size={32}
                  allowFraction
                  transition
                  emptyColor="rgba(255,255,255,0.4)"
                  emptyIcon={
                    <StarBorderIcon
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "29px",
                      }}
                    />
                  }
                  fillIcon={<StarIcon style={{ fontSize: "29px" }} />}
                  fillColor="#FFFF00"
                />
              </div>
              <div className={css.buttons}>
                <button onClick={() => !isLoading && setIsRatingModal(false)}>
                  Cancel
                </button>
                <Button
                  size="sm"
                  isLoading={isLoading}
                  onClick={handleRateAPost}
                >
                  Submit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RatingModal;
