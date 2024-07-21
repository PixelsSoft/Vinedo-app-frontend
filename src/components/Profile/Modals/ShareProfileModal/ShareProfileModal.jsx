import React, { useEffect, useRef, useState } from "react";
import css from "./ShareProfileModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import { IoCopyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

const ShareProfileModal = ({ isShareProfileModal, setIsShareProfileModal,username }) => {
  const modalRef = useRef(null);
   const [isCopied, setIsCopied] = useState(false);
   const [isCopiedBtn, setIsCopiedBtn] = useState(false);
   const profileLink = `vinedo.app/@${username}`; 

  useClickOutside(modalRef, () => setIsShareProfileModal(false));

   const copyToClipboard = async () => {
     try {
       await navigator.clipboard.writeText(profileLink);
       setIsCopied(true);
       setTimeout(() => setIsCopied(false), 3000);
     } catch (error) {
       console.error("Failed to copy:", error);
     }
   };

   const copyToClipboard2 = async () => {
     try {
       await navigator.clipboard.writeText(profileLink);
       setIsCopiedBtn(true);
       setTimeout(() => setIsCopiedBtn(false), 2000);
     } catch (error) {
       console.error("Failed to copy:", error);
     }
   };

  return (
    <div className={css.ratingWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isShareProfileModal && (
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
              <header>
                <p>Share your profile</p>
              </header>

              <div className={css.linkBox}>
                <div className={css.copyToClipboard}>
                  <span>vinedo.app/@{username}</span>
                  {isCopied ? (
                    <TiTick className={css.copiedIcon} fontSize={20} />
                  ) : (
                    <IoCopyOutline onClick={copyToClipboard} />
                  )}
                </div>
              </div>

              <div className={css.buttons}>
                <button onClick={() => setIsShareProfileModal(false)}>
                  Cancel
                </button>
                <button onClick={copyToClipboard2}>
                  {isCopiedBtn ? (
                    <>
                      <TiTick fontSize={17} style={{ marginTop: "-1px" }} />
                      <span>Copied</span>
                    </>
                  ) : (
                    "Copy link"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareProfileModal;
