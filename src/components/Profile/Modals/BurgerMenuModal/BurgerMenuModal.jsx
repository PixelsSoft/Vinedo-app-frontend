import React, { useRef, useState } from "react";
import css from "./BurgerMenuModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import { IoWalletOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BurgerMenuModal = ({
  isBurgerMenu,
  setIsBurgerMenu,
  setIsLogoutModal,
  setIsDeleteModal,
  setIsTermsModal,
  setIsPrivacyModal,
}) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useClickOutside(modalRef, () => setIsBurgerMenu(false));

  return (
    <div className={css.uploadWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isBurgerMenu && (
          <motion.div
            className={`${css.selectModal} md:max-w-sm md:mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className={css.selectCard}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.3 }}
              ref={modalRef}
            >
              <div
                className={css.item}
                onClick={() => user && navigate(`/creators-tool/${user?.id}`)}
              >
                <IoWalletOutline />
                <p>Creator’s tools</p>
              </div>

              <div
                className={css.item}
                onClick={() => {
                  setIsLogoutModal(true);
                  setIsBurgerMenu(false);
                }}
              >
                <TbLogout2 />
                <p>Log out</p>
              </div>

              <div
                className={css.item}
                onClick={() => {
                  setIsDeleteModal(true);
                  setIsBurgerMenu(false);
                }}
              >
                <AiOutlineDelete />
                <p>Delete your account</p>
              </div>

              <div className={css.term}>
                {" "}
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setIsPrivacyModal(true);
                    setIsBurgerMenu(false);
                  }}
                >
                  Privacy Policy
                </span>{" "}
                <span className="mx-2">|</span>{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setIsTermsModal(true);
                    setIsBurgerMenu(false);
                  }}
                >
                  Terms of Services
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BurgerMenuModal;
