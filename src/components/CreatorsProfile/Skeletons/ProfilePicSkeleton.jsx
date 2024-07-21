import React from "react";

const ProfilePicSkeleton = ({radius}) => {
  return (
    <div
      className="animate-pulse overflow-hidden rtl:space-x-reverse w-full h-full rounded-full"
      style={{
        borderRadius: radius ? radius : "0px",
      }}
    >
      <div className="flex overflow-hidden rounded-full border-1 border-gray-800 items-center justify-center w-full h-full bg-gray-300 sm:w-96 dark:bg-gray-700">
        <svg
          className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      </div>
    </div>
  );
};

export default ProfilePicSkeleton;
