import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./DeleteAccountModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import { useDeleteAccountMutation } from "../../../../services/api/profileApi/profileApi";
import { Button } from "@nextui-org/react";
import { useApiErrorHandling } from "../../../../hooks/useApiErrors";
import { toastSuccess } from "../../../Toast/Toast";

const DeleteAccountModal = ({ isDeleteModal, setIsDeleteModal }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setIsDeleteModal(false));

  const [deleteAccount, res] = useDeleteAccountMutation();
  const {isLoading, isSuccess, error} = res;

  useMemo(()=>{
    if(isSuccess){
        setIsDeleteModal(false);
        toastSuccess("Your account has been deleted");
        window.location.reload(false);
    }
  },[isSuccess]);

  const apiErrors = useApiErrorHandling(error);

  const handleDelete = async() => {
    await deleteAccount();
  };

  return (
    <div className={css.ratingWrapper}>
      {/* Select Modal  */}
      <AnimatePresence>
        {isDeleteModal && (
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
              <p>Are you certain about deleting your account?</p>
              <div className={css.buttons}>
                <Button isLoading={isLoading} onClick={handleDelete}>
                  Delete
                </Button>
                <button onClick={() => setIsDeleteModal(false)}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeleteAccountModal;
