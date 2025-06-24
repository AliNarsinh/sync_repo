import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { APP_ROUTES } from '@app/constants';
import { motion } from 'framer-motion';
import { IoHomeOutline } from 'react-icons/io5';
import { LuCalendarClock } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import { getLogoMark } from '@app/utils/helper';
import { MdOutlineLanguage } from 'react-icons/md';

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 w-full bg-[#E6F6FF] shadow-2xl	rounded-tl-2xl rounded-tr-2xl">
      <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0  relative">
        <div className="grid grid-cols-5 gap-4 h-[70px] ">
          <div className="flex justify-center items-center">
            <NavLink
              to={'/'}
              className={(navData) => (navData.isActive ? 'text-medium-icon text-light-blue' : 'text-medium-icon')}
            >
              <IoHomeOutline className="w-6 h-6" />
            </NavLink>
          </div>
          <div className="flex justify-center items-center">
            <NavLink
              to={'/calendar'}
              className={(navData) => (navData.isActive ? 'text-medium-icon text-light-blue' : 'text-medium-icon')}
            >
              <LuCalendarClock className="w-6 h-6" />
            </NavLink>
          </div>
          <div className="flex justify-center items-center relative">
            <div className="bg-white w-[61px] h-[61px] shadow-secondary-shadow flex justify-center items-center rounded-full absolute bottom-7">
              <Link to={APP_ROUTES.vital_signs}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4 }}>
                  <img src={getLogoMark()} alt="logomark" />
                </motion.div>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <NavLink
              to={'/change-language'}
              className={(navData) => (navData.isActive ? 'text-medium-icon text-light-blue' : 'text-medium-icon')}
            >
              <MdOutlineLanguage className="w-7 h-7" />
            </NavLink>
          </div>
          <div className="flex justify-center items-center">
            <NavLink
              to={'/profile'}
              className={(navData) => (navData.isActive ? 'text-medium-icon text-light-blue' : 'text-medium-icon')}
            >
              <FaRegUser className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
