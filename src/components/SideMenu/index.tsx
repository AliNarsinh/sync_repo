import {
  AngleRightIcon,
  ArrowLeftIcon,
  EnvelopIcon,
  HouseIcon,
  LogoutIcon,
  SquarePenIcon,
  UserCircleIcon,
} from '@app/assets/images/icons';
import { APP_NAME, APP_ROUTES, FEEDBACK_EMAIL } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { logout } from '@app/store/actions';
import { IStateReducers } from '@app/store/type';
import { unsetSentryUser } from '@app/utils/sentryUtil';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { MdOutlineLanguage } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  open: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const SideMenu: React.FC<Props> = ({ open, setIsSidebarOpen }) => {
  const { user } = useSelector((state: IStateReducers) => state.auth);
  const { translate } = useLocalization();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isClosed] = useState(false);

  const handleOnLogout = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    unsetSentryUser();
    dispatch(logout());
  };

  const handleRedirection = (routeName: string) => {
    navigate(routeName);
    setIsSidebarOpen(false);
  };

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  const handleSendFeedbackClick = () => {
    const emailAddress = FEEDBACK_EMAIL;
    const subject = `Feedback for Your ${APP_NAME}`;
    const body = 'Hello, I would like to provide the following feedback: ';
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={`bg-white fixed top-0 left-0 w-9/12 h-full z-10 `}
        >
          <section
            className={`bg-white fixed top-0 left-0 w-9/2 h-full z-10 ${
              open ? 'animate-slideFromRight' : 'animate-slideAgain'
            } ${isClosed ? 'isclosed' : ''}`}
          >
            <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 py-8 relative">
              <div className="cursor-pointer absolute">
                <div className="text-small-icon" onClick={handleClose}>
                  <ArrowLeftIcon />
                </div>
              </div>
              <h1 className="font-inter font-semibold text-xl leading-5 text-center text-primary-color">
                {translate('profile.page_title')}
              </h1>
            </div>
            <div className="container lg:w-3/5 w-72 mx-auto px-3 py-4 shadow-custom-shadow rounded-lg relative">
              <div className="flex items-center gap-4">
                <div className="text-large-icon">
                  <UserCircleIcon />
                </div>
                <div>
                  <h6 className="font-inter font-medium sm:text-base text-xl capitalize	 leading-[19.6px] text-primary-color">
                    {user?.firstName || user?.username}
                  </h6>
                  <p className="font-inter font-medium sm:text-sm text-sm mt-1 text-[#646464] leading-[14px]">
                    {translate('profile.view_profile')}
                  </p>
                </div>
              </div>
              <div className="absolute top-1.5 right-3 text-small-icon">
                <Link to={APP_ROUTES.profile}>
                  <SquarePenIcon />
                </Link>
              </div>
            </div>
            <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 relative">
              <div className="sm:pt-6 sm:pb-4 py-1">
                <div
                  className="flex justify-between items-center border-t border-b border-[#D7D7D7] py-3 sm:px-0 px-4"
                  onClick={() => handleRedirection(APP_ROUTES.home)}
                >
                  <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                    <HouseIcon className="w-7 h-7" />
                    <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                      {translate('profile.dashboard')}
                    </h6>
                  </div>
                  <div className="text-medium-icon">
                    <AngleRightIcon className="w-5 h-5" />
                  </div>
                </div>
                <div
                  className="flex justify-between items-center border-t border-b border-[#D7D7D7] py-3 sm:px-0 px-4"
                  onClick={() => handleRedirection(APP_ROUTES.calendar)}
                >
                  <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                    <UserCircleIcon className="w-7 h-7" />
                    <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                      {translate('profile.measurements')}
                    </h6>
                  </div>
                  <div className="text-medium-icon">
                    <AngleRightIcon className="w-5 h-5" />
                  </div>
                </div>
                <div
                  className="flex justify-between items-center border-t border-b border-[#D7D7D7] py-3 sm:px-0 px-4"
                  onClick={handleSendFeedbackClick}
                >
                  <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                    <EnvelopIcon className="w-7 h-7" />
                    <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                      {translate('profile.send_feedback')}
                    </h6>
                  </div>
                  <div className="text-medium-icon">
                    <AngleRightIcon className="w-5 h-5" />
                  </div>
                </div>

                <div
                  className="flex justify-between items-center border-b border-[#D7D7D7] py-3 sm:px-0 px-4"
                  onClick={() => handleRedirection(APP_ROUTES.version)}
                >
                  <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                    <UserCircleIcon className="w-7 h-7" />
                    <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                      {translate('profile.about_us')}
                    </h6>
                  </div>
                  <div className="text-medium-icon">
                    <AngleRightIcon className="w-5 h-5" />
                  </div>
                </div>
                <div
                  className="flex justify-between items-center border-b border-[#D7D7D7] py-3 sm:px-0 px-4"
                  onClick={() => handleRedirection(APP_ROUTES.change_language)}
                >
                  <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                    {/* <UserCircleIcon className='w-7 h-7'/> */}
                    <MdOutlineLanguage className="w-7 h-7" />
                    <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                      {translate('profile.change_language')}
                    </h6>
                  </div>
                  <div className="text-medium-icon">
                    <AngleRightIcon className="w-5 h-5" />
                  </div>
                </div>
                {/* <div
                  className="flex justify-between items-center border-b border-[#D7D7D7] py-3 sm:px-0 px-4"
                  onClick={handleOnLogout}
                >
                  <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                    <LogoutIcon className='w-7 h-7'/>
                    <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                      {translate('profile.logout')}
                    </h6>
                  </div>
                  <div className="text-medium-icon">
                    <AngleRightIcon className='w-5 h-5'/>
                  </div>
                </div> */}
              </div>
            </div>
            <div
              className="flex justify-between items-center absolute bottom-0 border-[#D7D7D7] py-3 sm:px-0 px-4"
              onClick={handleOnLogout}
            >
              <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                <LogoutIcon className="w-7 h-7" />
                <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                  {translate('profile.logout')}
                </h6>
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;
