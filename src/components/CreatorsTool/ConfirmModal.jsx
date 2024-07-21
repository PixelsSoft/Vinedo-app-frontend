import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./CreatorsTool.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../hooks/useClickOutside";
import { useNavigate, useParams } from "react-router-dom";
import {Button} from "@nextui-org/react";
import { useApiErrorHandling } from "../../hooks/useApiErrors";
import { toastSuccess } from "../Toast/Toast";
import { useWithdrawBalanceMutation } from "../../services/api/profileApi/profileApi";

const ConfirmModal = ({
  isConfirmModal,
  setIsConfirmModal,
  text,
  userId,
}) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  // const [withdrawBalance, res] = useWithdrawBalanceMutation();
  // const { isLoading, error, isSuccess } = res;

  // const apiErrors = useApiErrorHandling(error);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setIsConfirmModal(false);
  //     window.location.reload(false);
  //   }
  // }, [isSuccess]);

  // useEffect(() => {
  //   if (error) {
  //     setIsConfirmModal(false);
  //   }
  // }, [error]);

  const [errorr, setErrorr] = useState(null);


  const handleConfirm = async () => {
    fetch(`${import.meta.env.VITE_URI}widthdrawreq?id=${userId}`).then((res) => {
      return res.json();
    }).then((data ) => {
      console.log(data);
      if(data.success == true){
        setErrorr("Withdraw Successfully.");
        setTimeout(() => {
          setIsConfirmModal(false);
          window.location.reload();
        }, 1000)
      }else{
        setErrorr(data.message)
      }
    })
  };

  useClickOutside(modalRef, () => setIsConfirmModal(false));

  return (
    <div className={css.ratingWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isConfirmModal && (
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
              {
                errorr === null ? 
                <>
                <p>{text}</p>
              {/* <input type="number" className="amunt0-field" onChange={(e) => {setAmount(e.target.value)}} placeholder="0.00" /> */}
              <div className={css.buttons}>
                <button onClick={() => setIsConfirmModal(false)}>Cancel</button>
                <Button onClick={handleConfirm} size="sm">
                  Confirm
                </Button>
              </div>
              </> : 
                <p className="err">{errorr}</p>
              }
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfirmModal