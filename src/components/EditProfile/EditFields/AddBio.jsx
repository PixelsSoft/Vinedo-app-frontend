import React, { useMemo, useState } from "react";
import css from "./EditField.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { useStoreUserBioMutation } from "../../../services/api/profileApi/profileApi";

const AddBio = () => {
     const navigate = useNavigate();
     const maxLength = 255;
     const [bio, setBio] = useState("");

     const [storeBio, res] = useStoreUserBioMutation();
     const { isLoading, error, isSuccess } = res;

     useMemo(() => {
       if (isSuccess) {
        //  toastSuccess("Changes saved");
         navigate(`/profile`, { replace: true });
       }
     }, [isSuccess]);

     const apiErrors = useApiErrorHandling(error);

     const handleChange = (e) => {
       const { value, name } = e.target;
       if (value.length <= maxLength) {
         setBio(value);
       }
     };

     const handleSubmit = async () => {
       await storeBio({ description: bio });
     };

  return (
    <div className={css.wrapper}>
      <header>
        <IoIosArrowBack onClick={() => navigate(-1)} />
        <p>Add Bio</p>
      </header>

      <div className={css.field}>
        <div className={css.inputContainer}>
          <Input
            type="text"
            label="Enter bio"
            radius="full"
            name="bio"
            value={bio}
            size="lg"
            autoComplete="off"
            classNames={{
              label:
                "text-[#A1A3A7] text-small group[data-has-value=true] group-data-[has-value=true]:text-[#A1A3A7]",
              input: [
                "bg-[#292734]",
                "text-white/85",
                "placeholder:text-[#A1A3A7]",
                "hover:bg-[#292734]",
                "text-small",
                "group[data-has-value=true] group-data-[has-value=true]:text-white",
              ],
              innerWrapper: "bg-[#292734] text-white hover:bg-[#292734]",
              inputWrapper: [
                "bg-[#292734]",
                "group-data-[focused=true]:bg-[#292734]",
                "group-data-[hover=true]:bg-[#292734]",
                "hover:bg-[#292734]",
                "focus-within:!bg-[#292734] text-white",
                "text-white",
                "group[data-has-value=true] group-data-[has-value=true]:text-white",
                "!cursor-text",
              ],
            }}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-[#A1A3A7] text-tiny">{`${bio.length}/${maxLength}`}</span>
              </div>
            }
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className={css.button}>
        <Button
          size="sm"
          className="bg-transparent"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Save the Changes
        </Button>
      </div>
    </div>
  );
};

export default AddBio;
