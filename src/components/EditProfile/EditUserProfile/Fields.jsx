import React, { useState } from 'react'
import css from "./EditUserProfile.module.scss";
import { IoChevronForward } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { TiTick } from "react-icons/ti";

const Fields = ({data, isLoading}) => {
  console.log('data',data);
    const navigate = useNavigate();
   const [isCopied, setIsCopied] = useState(false);
   const profileLink = `vinedo.app/@${data?.user.username}`; 

   const copyToClipboard = async () => {
     try {
       await navigator.clipboard.writeText(profileLink);
       setIsCopied(true);
       setTimeout(() => setIsCopied(false), 3000);
     } catch (error) {
       console.error("Failed to copy:", error);
     }
   };
    
  return (
    <div className={css.fields}>
      <div className={css.heading}>About You</div>

      <div
        className={css.input}
        onClick={() => data && navigate(`/edit/name/${data?.user?.name}`)}
      >
        <p>Name</p>
        <div className={css.right}>
          <p>{data?.user?.name}</p>
          <IoChevronForward />
        </div>
      </div>

      <div
        className={css.input}
        onClick={() =>
          data && navigate(`/edit/username/${data?.user?.username}`)
        }
      >
        <p>Username</p>
        <div className={css.right}>
          <p>{data?.user?.username}</p>
          <IoChevronForward />
        </div>
      </div>

      <div className={css.copyToClipboard}>
        <span>vinedo.app/@{data?.user.username}</span>
        {isCopied ? (
          <TiTick className="text-green-600" fontSize={23} />
        ) : (
          <IoCopyOutline onClick={copyToClipboard} />
        )}
      </div>

      <div
        className={css.input}
        onClick={() => data && navigate(`/edit/price/${data?.user?.rate}`)}
      >
        <p>Set Your Price</p>
        <div className={css.right}>
          <p>{data?.user?.rate}</p>
          <IoChevronForward />
        </div>
      </div>

      <div
        className={css.input}
        onClick={() => data && navigate(`/creators-tool/${data?.user.id}`)}
      >
        <p>Creator’s Tool</p>
        <div className={css.right}>
          <p>Earnings</p>
          <IoChevronForward />
        </div>
      </div>
      <div
        className={css.input}
        onClick={() => data && navigate(`/edit/bio/${data?.user.description}`)}
      >
        <p>Edit Bio</p>
        <div className={css.right}>
          <p>{data?.user?.description}</p>
          <IoChevronForward />
        </div>
      </div>
    </div>
  );
}

export default Fields