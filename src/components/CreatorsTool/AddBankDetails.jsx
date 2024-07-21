import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import css from "./CreatorsTool.module.scss";
import { TbWorld } from "react-icons/tb";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Input } from "@nextui-org/react";
import { FaRegClock } from "react-icons/fa6";
import { bankDetailsSchema } from "../../utils/validation/AuthValidation";
import {
  useAddBankDetailsMutation,
  useGetBankDetailsQuery,
} from "../../services/api/profileApi/profileApi";
import { useApiErrorHandling } from "../../hooks/useApiErrors";
import { toastSuccess } from "../Toast/Toast";
import { ClipLoader } from "react-spinners";

const AddBankDetails = () => {
  const navigate = useNavigate();
  const { data, isLoading: isLoadingData } = useGetBankDetailsQuery();

  const [initialValues, setInitialValues] = useState({
    accountHolder: "",
    swift: "",
    iban: "",
    address: "",
  });

  useEffect(() => {
    if (data) {
      const bankDetails = data.bank_details;

      if (
        bankDetails.account_holder_name &&
        bankDetails.swift &&
        bankDetails.iban &&
        bankDetails.branch_address
      ) {
       
        setInitialValues({
          accountHolder: bankDetails.account_holder_name,
          swift: bankDetails.swift,
          iban: bankDetails.iban,
          address: bankDetails.branch_address,
        });
      }
    }
  }, [data]);

  const [addBankDetails, res] = useAddBankDetailsMutation();
  const { isLoading, error, isSuccess } = res;

  const apiErrors = useApiErrorHandling(error);

  useEffect(() => {
    if (isSuccess) {
      toastSuccess("Changes saved.");
    }
  }, [isSuccess]);

  const handleSubmit = async (values) => {
    await addBankDetails({
      account_holder_name: values.accountHolder,
      branch_address: values.address,
      iban: values.iban,
      swift: values.swift,
    });
  };

  const handleChange = (e, setFieldValue) => {
    const { value, name } = e.target;

    setFieldValue(name, value);
  };

  return (
    <div className={css.bankDetailsWrapper}>
      {/* <header>
        <IoIosArrowBack onClick={() => navigate(-1)} />
        <p>Add Bank Details</p>
      </header> */}

      <div className={css.content}>
        {/* <div className={css.note}>
          <TbWorld />
          <span>Recwive from a bank outside the EU and SEPA</span>
        </div> */}
        {isLoadingData ? (
          <div className="w-full h-screen flex justify-center mt-36">
            <ClipLoader color="#3632FF" size={27} speedMultiplier={0.85} />
          </div>
        ) : (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={bankDetailsSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, setFieldValue, touched, values }) => (
                <Form>
                  <div className={css.inputContainer}>
                    <label htmlFor="">Account holder</label>
                    <Input
                      type="text"
                      placeholder="Account holder name"
                      radius="full"
                      name="accountHolder"
                      id="accountHolder"
                      autoComplete="off"
                      isRequired
                      value={values.accountHolder}
                      size="lg"
                      classNames={{
                        input: [
                          "bg-[#292734]",
                          "text-white/90",
                          "placeholder:text-[#A1A3A7]",
                          "hover:bg-[#292734]",
                          "group[data-has-value=true] group-data-[has-value=true]:text-white",
                        ],
                        innerWrapper:
                          "bg-[#292734] text-white hover:bg-[#292734]",
                        inputWrapper: [
                          "bg-[#292734]",
                          "group-data-[focused=true]:bg-[#292734]",
                          "group-data-[hover=true]:bg-[#292734]",
                          "hover:bg-[#292734]",
                          "focus-within:!bg-[#292734] text-white",
                          "text-white",
                          "group[data-has-value=true] group-data-[has-value=true]:text-white",
                          "!cursor-text",
                          errors.accountHolder &&
                            touched.accountHolder &&
                            "border border-[#FF2D1B]",
                        ],
                      }}
                      onChange={(e) => handleChange(e, setFieldValue)}
                    />
                    <ErrorMessage
                      name="accountHolder"
                      component="div"
                      className={css.errorSpan}
                    />
                  </div>

                  <div className={css.inputContainer}>
                    <label htmlFor="">Swift/BIC</label>
                    <Input
                      type="text"
                      placeholder="Enter Swift"
                      radius="full"
                      name="swift"
                      id="swift"
                      autoComplete="off"
                      isRequired
                      value={values.swift}
                      size="lg"
                      classNames={{
                        input: [
                          "bg-[#292734]",
                          "text-white/90",
                          "placeholder:text-[#A1A3A7]",
                          "hover:bg-[#292734]",
                          "group[data-has-value=true] group-data-[has-value=true]:text-white",
                        ],
                        innerWrapper:
                          "bg-[#292734] text-white hover:bg-[#292734]",
                        inputWrapper: [
                          "bg-[#292734]",
                          "group-data-[focused=true]:bg-[#292734]",
                          "group-data-[hover=true]:bg-[#292734]",
                          "hover:bg-[#292734]",
                          "focus-within:!bg-[#292734] text-white",
                          "text-white",
                          "group[data-has-value=true] group-data-[has-value=true]:text-white",
                          "!cursor-text",
                          errors.swift &&
                            touched.swift &&
                            "border border-[#FF2D1B]",
                        ],
                      }}
                      onChange={(e) => handleChange(e, setFieldValue)}
                    />
                    <ErrorMessage
                      name="swift"
                      component="div"
                      className={css.errorSpan}
                    />
                  </div>

                  <div className={css.inputContainer}>
                    <label htmlFor="">IBAN</label>
                    <Input
                      type="text"
                      placeholder="Enter IBAN"
                      radius="full"
                      name="iban"
                      id="iban"
                      isRequired
                      value={values.iban}
                      autoComplete="off"
                      size="lg"
                      classNames={{
                        input: [
                          "bg-[#292734]",
                          "text-white/90",
                          "placeholder:text-[#A1A3A7]",
                          "hover:bg-[#292734]",
                          "group[data-has-value=true] group-data-[has-value=true]:text-white",
                        ],
                        innerWrapper:
                          "bg-[#292734] text-white hover:bg-[#292734]",
                        inputWrapper: [
                          "bg-[#292734]",
                          "group-data-[focused=true]:bg-[#292734]",
                          "group-data-[hover=true]:bg-[#292734]",
                          "hover:bg-[#292734]",
                          "focus-within:!bg-[#292734] text-white",
                          "text-white",
                          "group[data-has-value=true] group-data-[has-value=true]:text-white",
                          "!cursor-text",
                          errors.iban &&
                            touched.iban &&
                            "border border-[#FF2D1B]",
                        ],
                      }}
                      onChange={(e) => handleChange(e, setFieldValue)}
                    />
                    <ErrorMessage
                      name="iban"
                      component="div"
                      className={css.errorSpan}
                    />
                  </div>

                  <div className={css.inputContainer}>
                    <label htmlFor="">Address</label>
                    <Input
                      type="text"
                      placeholder="Address"
                      radius="full"
                      name="address"
                      id="address"
                      isRequired
                      value={values.address}
                      autoComplete="off"
                      size="lg"
                      classNames={{
                        input: [
                          "bg-[#292734]",
                          "text-white/90",
                          "placeholder:text-[#A1A3A7]",
                          "hover:bg-[#292734]",
                          "group[data-has-value=true] group-data-[has-value=true]:text-white",
                        ],
                        innerWrapper:
                          "bg-[#292734] text-white hover:bg-[#292734]",
                        inputWrapper: [
                          "bg-[#292734]",
                          "group-data-[focused=true]:bg-[#292734]",
                          "group-data-[hover=true]:bg-[#292734]",
                          "hover:bg-[#292734]",
                          "focus-within:!bg-[#292734] text-white",
                          "text-white",
                          "group[data-has-value=true] group-data-[has-value=true]:text-white",
                          "!cursor-text",
                          errors.address &&
                            touched.address &&
                            "border border-[#FF2D1B]",
                        ],
                      }}
                      onChange={(e) => handleChange(e, setFieldValue)}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className={css.errorSpan}
                    />
                  </div>

                  <div className={css.actionBtn}>
                    <Button isLoading={isLoading} type="submit">
                      Save Changes
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className={css.paymentTimeNote}>
              <FaRegClock />
              <span>Payments take up to 5 working days to arrive</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddBankDetails;
