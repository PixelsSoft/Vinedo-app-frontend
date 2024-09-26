import React, { useState, useEffect } from "react";
import TopBackNavigation from "../components/ui/TopBackNavigation/TopBackNavigation";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import css from "../components/Profile/UserProfile/UserProfile.module.scss";
import { FaCross, FaPlus } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import {
  useAddLinkMutation,
  useDeleteLinkMutation,
  useGetLinksQuery,
} from "../services/api/profileApi/profileApi";
import { TfiWorld } from "react-icons/tfi";
import { MdDeleteForever } from "react-icons/md";
import { toastError, toastSuccess } from "../components/Toast/Toast";
import { useSelector } from "react-redux";
import { IoMdCheckmark } from "react-icons/io";
import { PiPlusCircleThin } from "react-icons/pi";

const LinksPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { user } = useSelector((store) => store.auth);
  console.log("sateData", user);
  const userPage = !pathname.includes("creators");

  const creatorId = userPage ? user.id : id;
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    user_id: user.id,
  });
  const [linksList, setLinksList] = useState([]);
  const [showInputs, setShowInputs] = useState(false);

  const { data } = useGetLinksQuery(creatorId, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    if (data?.data) {
      setLinksList(data.data);
    }
  }, [data]);

  const [deleteLink] = useDeleteLinkMutation();
  const handleDelete = async (id) => {
    try {
      await deleteLink(id).unwrap();
      setLinksList(linksList.filter((link) => link.id !== id));
      console.log("Link deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the link:", error);
    }
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [addLink, res] = useAddLinkMutation();
  const { isLoading, error, isSuccess } = res;
  const handleSubmit = async () => {
    try {
      const response = await addLink({
        title: formData.title,
        url: formData.url,
      }).unwrap();
      console.log("responsessss", response);

      setLinksList([...linksList, response]);
      setShowInputs(false); // Hide inputs after successful submission
      setFormData({ title: "", url: "", user_id: "" });
      console.log("Link added successfully!");
      toastSuccess("Link Added");
    } catch (error) {
      toastError(error?.data?.message.url[0] || "error");
      console.error("Failed to add the link:", error);
    }
  };

  return (
    <div>
      <TopBackNavigation onBack={() => navigate(-1)} heading="Links" />
      {linksList.length<4 &&

!showInputs && userPage && (
  <div
    className="flex mx-auto justify-start ml-4 items-center space-x-2 cursor-pointer"
    onClick={() => setShowInputs(true)}
  >
    <div>
      <PiPlusCircleThin className="text-[30px]" />
    </div>

    <span>Add link</span>
  </div>
)


      }
      {showInputs && (
        <div className="flex flex-col space-y-2 my-4 p-2">
          <div className={css.inputContainer} style={{ borderRadius: "10px" }}>
            <Input
              require
              type="url"
              label="URL"
              name="url"
              value={formData.url}
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
              onChange={handleChange}
            />
          </div>
          <div className={css.inputContainer}>
            <Input
              required
              type="TITLE"
              label="TITLE"
              name="title"
              value={formData.title}
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
              onChange={handleChange}
            />
          </div>
        </div>
      )}
  {showInputs && (
        <div
          className="flex mx-auto justify-center items-center space-x-2"
          onClick={handleSubmit}
        >
          <div>
            <div>
              <span className="rounded-full border-1 border-blue-600 px-10 cursor-pointer">
                Add external link
              </span>
            </div>
          </div>
        </div>
      )}
       <div>
        <ul>
          {linksList?.map((item) => (
            <li key={item.id}>
              <div className="flex flex-row justify-between space-x-4 p-6 items-center">
                <div className="flex space-x-4 items-center justify-center">
                  <Link to={item.url}>
                    <div className="flex space-x-4 items-center">
                      <p>{item.title}</p>
                    </div>
                  </Link>
                </div>
                {userPage && (
                  <MdDeleteForever
                    className="cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LinksPage;
