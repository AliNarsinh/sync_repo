import React from 'react';
import { useLocalization } from '@app/hooks';
import {
  AngleRightIcon,
  BookIcon,
  CircleInfoIcon,
  SettingsIcon,
  SquarePenIcon,
  UserCircleIcon,
  LogoutIcon,
  SearchIcon,
} from '@app/assets/images/icons';
import Navbar from '@app/components/Navbar';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const { translate } = useLocalization();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="bg-white h-full">
        <Navbar title={translate('profile.page_title')} />
        <div className="container lg:w-3/5 w-72 mx-auto px-3 py-4 bg-[#E4E4E4] border border-[#E4E4E4] shadow-custom-shadow rounded-lg relative">
          <div className="flex items-center gap-4">
            <div className="text-large-icon">
              <UserCircleIcon />
            </div>
            <div>
              <h6 className="font-inter font-medium sm:text-base text-sm leading-[19.6px] text-primary-color">
                {translate('profile.user_name')}
              </h6>
              <p className="font-inter font-medium sm:text-sm text-[10px] text-[#646464] leading-[14px]">
                {translate('profile.view_profile')}
              </p>
            </div>
          </div>
          <div className="absolute top-1.5 right-3 text-small-icon">
            <SquarePenIcon />
          </div>
        </div>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 py-8 relative">
          <div className="sm:pt-6 sm:pb-4 py-8">
            <div className="flex justify-between items-center border-t border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                <UserCircleIcon />
                <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                  {translate('profile.subsection_1')}
                </h6>
              </div>
              <div className="text-medium-icon">
                <AngleRightIcon />
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                <BookIcon />
                <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                  {translate('profile.subsection_2')}
                </h6>
              </div>
              <div className="text-medium-icon">
                <AngleRightIcon />
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                <CircleInfoIcon />
                <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                  {translate('profile.subsection_3')}
                </h6>
              </div>
              <div className="text-medium-icon">
                <AngleRightIcon />
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                <SearchIcon />
                <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                  {translate('profile.subsection_4')}
                </h6>
              </div>
              <div className="text-medium-icon">
                <AngleRightIcon />
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                <SettingsIcon />
                <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                  {translate('profile.subsection_5')}
                </h6>
              </div>
              <div className="text-medium-icon">
                <AngleRightIcon />
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                <UserCircleIcon />
                <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                  {translate('profile.subsection_6')}
                </h6>
              </div>
              <div className="text-medium-icon">
                <AngleRightIcon />
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-large-icon text-light-blue">
                <LogoutIcon />
                <h6 className="font-inter font-normal text-[17.44px] leading-[24.42px] text-primary-color">
                  {translate('profile.subsection_7')}
                </h6>
              </div>
              <div className="text-medium-icon">
                <AngleRightIcon />
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Settings;
