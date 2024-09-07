import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // using react-icons for back arrow
import PropTypes from 'prop-types';
import { IoIosArrowBack } from "react-icons/io";


const TopBackNavigation = ({ heading, onBack }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-transparent  relative top-0 left-0 right-0 z-10">
      <button onClick={onBack} className="text-white">
        <IoIosArrowBack size={20} />
      </button>
      <p className=" font-semibold absolute left-0 right-0 text-center pointer-events-none">
        {heading}
      </p>
    </div>
  );
};

TopBackNavigation.propTypes = {
  heading: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default TopBackNavigation;
