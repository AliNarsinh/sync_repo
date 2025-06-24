import { arrow, clocktwo } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import { getDateLanguage, utcToDateformate } from '@app/utils/dateFormatter';
import { checkWellnessLevel } from '@app/utils/emojiCalculation';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type ListingProps = {
  binnahListing: DataProps[];
};

type DataProps = {
  _id: string;
  integration: number;
  createdAt: string;
  sessionData: {
    wellnessLevel: {
      value: number;
    };
    wellnessIndex: {
      value: number;
    };
  };
};

const BinnaListing: React.FC<ListingProps> = ({ binnahListing }) => {
  const navigate = useNavigate();
  const { translate, i18n } = useLocalization();
  const currentLanguage = getDateLanguage(i18n.language);

  const handleredirect = (item: DataProps) => {
    navigate(`/wellness_score/${item?._id}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      {binnahListing.map((item: DataProps) => (
        <div key={item?._id} className=" border-t border-b border-[#D7D7D7] py-3 sm:px-0 px-3">
          <div className="bg-white w-full flex justify-between items-center p-3 rounded-lg">
            <div className="flex items-center justify-normal gap-3">
              <div className="w-11 h-11 flex items-center justify-center bg-[#E6F6FF] rounded-lg ">
                <p className="text-ex-small  text-primary-color">
                  {checkWellnessLevel(item?.sessionData?.wellnessLevel?.value, translate)}
                </p>
              </div>
              <div className="flex flex-col gap-1 mr-1">
                <h6 className="font-inter font-semibold text-base leading-[22.4px] text-primary-color">
                  {translate('wellness.title')}: {item?.sessionData?.wellnessIndex?.value ?? 'N/A'}/10
                </h6>
                <div className="flex items-center justify-normal gap-1">
                  <button onClick={() => handleredirect(item)}>
                    <img src={clocktwo} alt="clocktwo" />
                  </button>
                  <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-[#646464CC]">
                    {utcToDateformate(item?.createdAt, currentLanguage) ?? 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => handleredirect(item)}>
              <img src={arrow} alt="arrow" className="" />
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default BinnaListing;
