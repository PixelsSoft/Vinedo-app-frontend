import React, { useEffect, useRef, useState } from "react";
import css from "./AdultModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import { Link, useNavigate } from "react-router-dom";

const AdultModal = ({ isAdultModal, setAdultModal,setIsPrivacyModal,setIsTocModal}) => {
  const modalRef = useRef(null);

  // useClickOutside(modalRef, () => setAdultModal(false));
  const navigate = useNavigate();
  const handleAdultModal = ()=>{
    navigate("/login");
    setAdultModal(false)
  }

  return (
    <div className={css.ratingWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isAdultModal && (
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
              <h1   className={css.heading}>18+ </h1>
              <p style={{fontSize:18, fontWeight:"bold"}}>ADULTS ONLY </p>
              <p>Please confirm that you are over 18 and agree with 
                
                <Link 
                onClick={async()=>{
                  // await setAdultModal(false)
                 await  setIsTocModal(true)
                   }} 
                style={{color: "#3632ff"}}> ToS</Link> &
                 <Link onClick={async()=>{
                //  await setAdultModal(false)
                await  setIsPrivacyModal(true)
                
                  }} style={{color: "#3632ff"}}> Privacy Policy </Link>or leave the website.</p>
              <div className={css.buttons}>
                <button onClick={handleAdultModal}>Yes</button>
                <button onClick={() => setAdultModal(false)}>No</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdultModal;
