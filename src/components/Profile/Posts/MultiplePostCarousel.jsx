import React, { useState } from "react";
import css from "./ViewPost.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import ImagePostViewComponent from "../../ui/Image/ImagePostViewComponent";

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

const MultiplePostCarousel = ({ images, isLoading }) => {
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
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        
      {/* Post Numbering  */}
      <div className={css.postNumbers}>
        <span>
          {page + 1}/{images?.length}
        </span>
      </div>

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
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            userSelect:"none"
          }}
        >
          <ImagePostViewComponent
            src={
              import.meta.env.VITE_IMAGE_POST_URI + images[dataIndex].filename
            }
            radius={0}
            isLoading={isLoading}
            pointerEvents={true}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MultiplePostCarousel;
