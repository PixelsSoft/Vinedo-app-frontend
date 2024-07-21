import React, { useEffect, useState } from "react";
import css from "./ProfileTabs.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Posts from "../../Profile/Posts/Posts";
import { LuLayoutGrid } from "react-icons/lu";
import { PiVideoLight } from "react-icons/pi";
import VideoPosts from "../../Profile/Videos/VideoPosts";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setActivePostTab } from "../../../services/slices/posts/postSlice";
import SubscribeCard from "../../Profile/Posts/SubscribeCard";

const tabs = [
  {
    id: 0,
    label: <LuLayoutGrid />,
  },
  {
    id: 1,
    label: <PiVideoLight fontSize={35} />,
  },
];

const tabContentVariants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -10,
    opacity: 0,
  },
};

const ProfileTabs = ({
  data,
  isLoading,
  isSubscribed,
  creator,
  imageCount,
  videoCount,
}) => {
  const [posts, setPosts] = useState([]);
  const [videoPosts, setVideoPosts] = useState();
  const [imagePosts, setImagePosts] = useState();
  // const { activePostTab } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      let videoPosts = 0;
      let imagePosts = 0;
      setPosts(data);

      data.map((item) => {
        if (item.type === 0) {
          imagePosts++;
        } else if (item.type === 1) {
          videoPosts++;
        }
      });

      setVideoPosts(videoPosts);
      setImagePosts(imagePosts);
    }else{
      setVideoPosts(null);
      setImagePosts(null);
    }
  }, [data]);

  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (e, tab) => {
    e.preventDefault();

    setActiveTab(tab.id);
    // dispatch(setActivePostTab(tab.id));
  };

  const isSelected = (tab) => activeTab === tab.id;

  return (
    <div className={css.tabWrapper}>
      <div className={css.tabHeader}>
        {tabs?.map((tab) => (
          <div
            key={tab.id}
            className={[css.tabItem, isSelected(tab) ? css.selected : ""].join(
              " "
            )}
            onClick={(e) => handleClick(e, tab)}
          >
            <div
              className={`text-[32px] transition-all ${css.icon} ${
                isSelected(tab) ? "text-white" : "text-[#7B7B7B]"
              }`}
            >
              {tab.label}
            </div>

            {isSelected(tab) && (
              <motion.div layoutId="indicator" className={css.indicator} />
            )}
          </div>
        ))}
      </div>

      <div className={css.tabContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab || "empty"}
            variants={tabContentVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{
              duration: 0.28,
            }}
          >
            {/* {activeTab && activeTab?.render()} */}
            {isLoading ? (
              <div className="w-full h-[200px] flex items-center justify-center">
                <ClipLoader color="#f5f5f5" size={42} speedMultiplier={0.74} />
              </div>
            ) : activeTab === 0 ? (
              <>
              {
                isSubscribed && (
                  <Posts posts={posts} isLoading={isLoading} />
                )
              }
                {isSubscribed && imagePosts === 0 && (
                  <div className="w-full h-[180px] flex items-center justify-center">
                    <p className="text-small text-[#f5f5f5] font-medium">
                      No Posts yet!
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
              {
                isSubscribed && (
                  <VideoPosts posts={posts} isLoading={isLoading} />
                )
              }
                {isSubscribed && videoPosts === 0 && (
                  <div className="w-full h-[180px] flex items-center justify-center">
                    <p className="text-small text-[#f5f5f5] font-medium">
                      No Posts yet!
                    </p>
                  </div>
                )}
              </>
            )}

            {/* If Not Subscribed Then Show the Card  */}
            {!isLoading && !isSubscribed && (
              <SubscribeCard
                creator={creator}
                imageCount={imageCount}
                videoCount={videoCount}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileTabs;
