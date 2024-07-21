import React, { useEffect, useRef, useState } from "react";
import css from "./Privacy.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import { MdClose } from "react-icons/md";
import { data } from "./data";

const PrivacyServicesModal = ({ isPrivacyModal, setIsPrivacyModal }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setIsPrivacyModal(false));

  return (
    <div className={css.ratingWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isPrivacyModal && (
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
              <div className={css.closeIcon} onClick={() => setIsPrivacyModal(false)}>
                <MdClose />
              </div>
              <div className={css.header}>
                <span>Privacy Policy</span>
              </div>

              <div className={css.content}>
                {data?.map((item, index) => (
                  <div
                    key={index}
                    className={item.title ? css.subHeading : css.desc}
                  >
                    {item.content}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrivacyServicesModal;
