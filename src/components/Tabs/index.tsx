import { search } from '@app/assets/images';
import Listing from '@app/components/Listing';
import BinnaListing from '@app/components/Listing/BinnaListing';
import { useLocalization } from '@app/hooks';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import useAuth from '@app/hooks/useAuth';
import { Integrations } from '@app/constants';
import { getBookMarkByRegion } from '@app/utils/helper';

const Loader = ({ loadingText }: any) => (
  <div className="w-full h-80 flex justify-center items-center flex-col">
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4 }}>
      <img src={getBookMarkByRegion()} alt="logomark" className="w-12" />
    </motion.div>
    <h2 className="text-primary-color mt-3">{loadingText}</h2>
  </div>
);

const CustomTabs: React.FC<any> = ({ activeTab, handleTabClick, responseData, isLoader }) => {
  const { translate } = useLocalization();
  const { user } = useAuth();
  const [skiniveCount, setSkiniveCount] = useState<number>(0);
  const [binnaCount, setBinnaCount] = useState<number>(0);

  useEffect(() => {
    user?.company?.companyRules?.forEach((item: any) => {
      if (item?.integration === Integrations.SKINIVE) {
        setSkiniveCount(item?.sessionCount);
      } else if (item?.integration === Integrations.BINNAH) {
        setBinnaCount(item?.sessionCount);
      }
    });
  }, [user]);

  return (
    <div className="px-3 pb-10">
      <div className="flex justify-between items-center bg-[#E6F6FF] sm:p-2 p-1 rounded-xl mb-4">
        <button
          onClick={() => handleTabClick('tab1')}
          className={`w-1/2 text-center font-inter transition duration-300  font-normal text-[16.23px] leading-[22.72px] ${
            activeTab === 'tab1' ? 'text-white bg-secondary-color rounded-[9.27px] sm:p-2 p-1' : 'text-primary-color'
          }`}
        >
          {translate('home.tab_one')}
        </button>

        <button
          onClick={() => handleTabClick('tab2')}
          className={`w-1/2 text-center font-inter transition duration-300 font-normal text-[16.23px] leading-[22.72px] ${
            activeTab === 'tab2' ? 'text-white bg-secondary-color rounded-[9.27px] sm:p-2 p-1' : 'text-primary-color'
          }`}
        >
          {translate('home.tab_two')}
        </button>
      </div>
      <div className="flex justify-center items-center gap-1">
        <div>
          <img src={search} alt="search" className="cursor-pointer" />
        </div>
        <div>
          <p className="font-inter font-semibold text-[13px] leading-[18px] text-primary-color">
            {activeTab === 'tab1' ? translate('home.tab_one') : activeTab === 'tab2' ? translate('home.tab_two') : null}
          </p>
        </div>
        <div>
          <p className="font-inter font-semibold text-[13px] leading-[18px] text-primary-color">-</p>
        </div>
        <div>
          <p className="font-inter font-normal text-[13px] leading-4 text-primary-color">
            {translate('home.sessions')}
            {activeTab === 'tab2' ? skiniveCount : activeTab === 'tab1' ? binnaCount : null}{' '}
          </p>
        </div>
      </div>
      <div className="pt-3 pb-8">
        <h2 className="font-inter font-semibold sm:text-xl text-base leading-[22.4px] text-primary-color mb-4">
          {translate('home.recent')}
        </h2>
        {isLoader ? (
          <Loader loadingText={translate('general.loading')} />
        ) : activeTab === 'tab1' ? (
          <BinnaListing binnahListing={responseData} />
        ) : (
          activeTab === 'tab2' && <Listing vitalsData={responseData} />
        )}
      </div>
    </div>
  );
};

export default CustomTabs;
