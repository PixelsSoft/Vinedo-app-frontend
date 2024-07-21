import React, { useEffect, useRef, useState } from "react";
import css from "./Terms.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import { MdClose } from "react-icons/md";
import { data } from "./data";

const TermsServicesModal = ({ isTermsModal, setIsTermsModal }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setIsTermsModal(false));

  return (
    <div className={css.ratingWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isTermsModal && (
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
              <div className={css.closeIcon} onClick={() => setIsTermsModal(false)}>
                <MdClose />
              </div>
              <div className={css.header}>
                <span>Terms of Service</span>
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

export default TermsServicesModal;
