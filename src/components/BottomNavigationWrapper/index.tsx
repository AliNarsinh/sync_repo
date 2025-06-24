import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../SideMenu';
import { BarsIcon } from '@app/assets/images/icons';
import BottomNav from '../BottomNav';
// import { useTypedSelector } from '@app/store';
// import { APP_ROUTES } from '@app/constants';
// import { useNavigate } from 'react-router-dom';
import { getLogoByRegion } from '@app/utils/helper';

const BottomNavigationWrapper = ({ children }: any) => {
  // const { language } = useTypedSelector((state) => state.lang);
  // const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const openSideBar = () => {
    setIsSidebarOpen(true);
  };
  // const onClickFlag = () => {
  //   navigate(APP_ROUTES.change_language);
  // };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 pt-4 relative">
          <div className="cursor-pointer flex justify-between items-center relative">
            <div className="flex-1">
              {' '}
              <BarsIcon className="text-lg  text-left" onClick={openSideBar} />
            </div>
            <img src={getLogoByRegion()} alt="leftarrow" className="flex-1 sm:w-auto w-[189.22px] h-auto" />
            <div
              className="flex-1 flex-end"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              // onClick={onClickFlag}
            >
              {/* <p className="text-xl font-bold leading-[19.6px]">{language === LANGS.ENGLISH ? 'English' : 'Русский'}</p> */}
            </div>
          </div>
        </div>
        {children}
        <BottomNav />
      </section>
      {isSidebarOpen && <SideMenu open={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
    </motion.div>
  );
};

export default BottomNavigationWrapper;
