import React, { useEffect, useRef, useState } from "react";
import css from "./LogoutModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";

const LogoutModal = ({ isLogoutModal, setIsLogoutModal }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setIsLogoutModal(false));

  const handleLogout = ()=>{
    localStorage.removeItem("vineo_authToken");
    window.location.reload(false);
  }

  return (
    <div className={css.ratingWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isLogoutModal && (
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
              <p>Are you sure you want to log out?</p>
              <div className={css.buttons}>
                <button onClick={handleLogout}>Log out</button>
                <button onClick={() => setIsLogoutModal(false)}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LogoutModal;
