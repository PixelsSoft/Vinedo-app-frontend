import React, { useState } from "react";
import css from "./PostPreview.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      position: "absolute",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      position: "absolute",
    };
  },
};

const swipeConfidenceThreshold = 100;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const MultiplePostsSwiper = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    const nextPage = page + newDirection;
    if (nextPage >= 0 && nextPage <= images.length - 1) {
      setPage([nextPage, newDirection]);
    }
  };

  const dataIndex = wrap(0, images.length, page);

  return (
    <div
      style={{
        width: "100%",
        height: "68%",
        position: "relative",
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              page < images.length && paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          style={{
            width: "100%",
            maxHeight: "410px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            key="previwImage"
            className={css.imageCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: images ? 1 : 0 }}
            transition={{ duration: 0 }}
          >
            <img src={images[dataIndex]} alt="" style={{pointerEvents:"none"}} />
            {/* Post Numbering  */}
            <div className={css.postNumbers}>
              <span>
                {page + 1}/{images?.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Swipe Dots  */}
      {/* <div className="flex w-full absolute left-0 right-0 bottom-28 space-x-2 items-center justify-center mx-auto">
        {Array(images.length)
          .fill(null)
          .map((item, index) =>
            page === index ? (
              <div
                key={index}
                className="w-[20px] h-[8px] bg-[#3632FF] rounded-full cursor-pointer transition-all"
              ></div>
            ) : (
              <div
                key={index}
                onClick={() => {
                  (page === 0 || page < index) ? paginate(1) : index < page && paginate(-1);
                }}
                className="w-[7px] h-[8px] bg-white rounded-full cursor-pointer transition-all"
              ></div>
            )
          )}
      </div> */}
    </div>
  );
};

export default MultiplePostsSwiper;
