import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./UnsubscribeModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../../../hooks/useClickOutside";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useApiErrorHandling } from "../../../../hooks/useApiErrors";
import { useRefundSubscriptionMutation } from "../../../../services/api/creatorsApi/creatorsApi";

const UnsubscribeModal = ({ isConfirmModal, setIsConfirmModal,creatorId }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [refundSubscription, res] = useRefundSubscriptionMutation();
  const { isLoading, error, isSuccess } = res;

  const apiErrors = useApiErrorHandling(error);

  useEffect(() => {
    if (isSuccess) {
      setIsConfirmModal(false);
      window.location.reload(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setIsConfirmModal(false);
    }
  }, [error]);

  const handleConfirm = async () => {
    await refundSubscription({ creatorId: creatorId });
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
              <p>Are you sure you want to unsubscribe?</p>
              <div className={css.buttons}>
                <button onClick={() => setIsConfirmModal(false)}>Cancel</button>
                <Button onClick={handleConfirm} isLoading={isLoading} size="sm">
                  Confirm
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnsubscribeModal;
