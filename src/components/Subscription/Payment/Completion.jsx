import { Button } from "@nextui-org/react";
import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCreatorDetailsByIdQuery } from "../../../services/api/creatorsApi/creatorsApi";
import { ClipLoader } from "react-spinners";

const Completion = () => {
  const navigate = useNavigate();
  const {creatorId} = useParams();
  const { data, isLoading } = useGetCreatorDetailsByIdQuery(creatorId);

  return (
    <div
      style={{
        gap: "11px",
      }}
      className="w-full h-screen flex items-center justify-center flex-col"
    >
      <div className="w-[80px] h-[80px] bg-green-600 text-white rounded-full mx-auto my-2 flex items-center justify-center">
        <TiTick fontSize={65} />
      </div>
      <p className="text-lg font-bold mb-0">Subscription Successful!</p>
      {isLoading ? (
        <ClipLoader color="#3632FF" size={15} speedMultiplier={0.9} />
      ) : (
        <h1 className="text-center mt-0 max-w-xs font-normal text-sm text-default-300">
          Congratulations! You are subscribed to{" "}
          <span className="font-semibold">@{data?.user?.username}</span>. Thank
          you! 🎉
        </h1>
      )}

      <Button
        color="primary"
        radius="sm"
        className="mt-28 w-[80%] bg-[#3632ff]"
        onClick={() => navigate(`/creators/${data?.user.username}`)}
      >
        Go to @{data?.user?.username} profile
      </Button>
    </div>
  );
};

export default Completion;
