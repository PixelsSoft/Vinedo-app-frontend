import React, { useEffect, useState } from "react";
import css from "./CreatorsTool.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCreatorDetailsByIdQuery } from "../../services/api/creatorsApi/creatorsApi";
import { ClipLoader } from "react-spinners";
import ConfirmModal from "./ConfirmModal";
import { FaPlus } from "react-icons/fa6";
import {
  useGetBankDetailsQuery,
  useGetWithdrawDetailsQuery,
} from "../../services/api/profileApi/profileApi";
import { AiFillEdit } from "react-icons/ai";
import { Skeleton } from "@nextui-org/react";
import { toastError } from "../Toast/Toast";
import { useGetAllPostsByUserQuery } from "../../services/api/postApi/postApi";
// import { useConnectStripeMutation } from "../../services/api/StripeApi/StripeApi";

const CreatorsTool = () => {
  const navigate = useNavigate();
  const { creatorId } = useParams();
  const { data: bankData, isLoading: isLoadingData } = useGetBankDetailsQuery();
  const [isBankDetails, setIsBankDetails] = useState(false);
  const { data, isLoading } = useGetCreatorDetailsByIdQuery(creatorId);
  const [isConfirmModal, setIsConfirmModal] = useState();

  const { data: withdraw, isLoading: isLoadingWithdraw } =
    useGetWithdrawDetailsQuery();

  useEffect(() => {
    if (bankData) {
      const bankDetails = bankData.bank_details;

      if (
        bankDetails.account_holder_name &&
        bankDetails.swift &&
        bankDetails.iban &&
        bankDetails.branch_address
      ) {
        setIsBankDetails(true);
      }
    }
  }, [bankData]);

  const { data: postsData, isLoading: isLoadingPosts } =
    useGetAllPostsByUserQuery();

  // const [ConnectStripe, resp] = useConnectStripeMutation();

  const handleWithdraw = () => {
    // if (!isBankDetails) {
    //   navigate(`/addBankDetails`);
    // } else {
    //   if (parseInt(data.user.balance) == 0) {
    //     toastError("You do not have sufficient balance.");
    //     return;
    //   } else {
    //     setIsConfirmModal(true);
    //   }
    // }
    // setIsConfirmModal(true);
    if(data.user.stripe_status === 0 || data.user.stripe_status === null){
      fetch(`${import.meta.env.VITE_URI}connected_account?id=${data?.user?.id}`).then((res) => {
        return res.json();
      }).then((datas ) => {
        window.location.replace(datas?.link);
      }) 
    }else{
      setIsConfirmModal(true);
    }
  };


  return (
    <div className={css.wrapper}>
      {/* Confirmation Modal  */}
      <ConfirmModal
        isConfirmModal={isConfirmModal}
        setIsConfirmModal={setIsConfirmModal}
        text={"Are you sure you want to withdraw?"}
        withdraw={true}
        userId={data?.user?.id}
      />
      <header>
        <IoIosArrowBack onClick={() => navigate(-1)} />
        <p>Creator’s tool</p>
      </header>

      <div className={css.card}>
        <p>Balance</p>
        <div className={css.amount} style={{ height: "30px" }}>
          {isLoading ? (
            <ClipLoader color="#3632FF" size={20} speedMultiplier={0.95} />
          ) : (
            <>
              <span>€</span>
              <p>{data?.user.balance}</p>
              <span>{data?.user.balance > 0 ? "K" : ''}</span>
            </>
          )}
        </div>
        {isLoadingWithdraw ? (
          <Skeleton className="w-[144px] h-[29px] mx-auto rounded-full dark" />
        ) : withdraw?.withdraw ? (
          <div className="h-[29px] px-2.5 flex items-center justify-center text-[12px] font-normal bg-[#e6f4ff] border-1 border-[#91caff] text-black text-opacity-85 rounded-full">
            Your withdraw is pending.
          </div>
        ) : (
          <button disabled={isLoadingData} onClick={handleWithdraw}>
            WITHDRAW
          </button>
        )}
      </div>

      {/* Bank Account Details Button  */}
   
    </div>
  );
};

export default CreatorsTool;
