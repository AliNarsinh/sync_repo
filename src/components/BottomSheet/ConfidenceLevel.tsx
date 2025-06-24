import { leftarrow } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import { BinnahProps } from '@app/types/binahTypes';
import { getConfidenceColor, getConfidenceText } from '@app/utils/emojiCalculation';
import React from 'react';
import ScrollWithin from './Scroll';

const ConfidenceLevel: React.FC<BinnahProps> = ({ data, setIsBottomSheetOpen }) => {
  const { translate } = useLocalization();

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="bg-white relative w-full h-full">
      <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 text-center flex flex-col items-center justify-center sm:gap-4 gap-4 pt-12 pb-5">
        <div className="w-full relative">
          <div>
            <div className="cursor-pointer absolute left-0">
              <img src={leftarrow} alt="leftarrow" className="w-8" onClick={handleClose} />
            </div>
            <h1 className="font-inter font-bold sm:text-xl text-sm leading-[19.6px] text-center text-primary-color sm:w-full w-48 sm:m-0 m-auto">
              {translate('missing_general.the')} {translate('missing_general.confidence_level')}{' '}
              {translate('missing_general.in_this_result')} {translate('missing_general.is')}
              {getConfidenceText(data?.value?.confidenceLevel, translate) ?? translate('not_data.NA')}
            </h1>
            <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
              <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                <div className={`w-9 h-9 rounded-full ${getConfidenceColor(data?.value?.confidenceLevel)}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
        <ScrollWithin>
          <div>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate('missing_general.confidence.para_one')}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate('missing_general.confidence.sub_para_one')}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate('missing_general.confidence.para_two')}
            </p>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 mt-3">
                <div className="w-4 h-4 rounded-full bg-[#a7e96a]"></div>
                <span className="text-dark-grey font-inter font-normal sm:text-sm text-xs">
                  {translate('missing_general.confidence.high')} {translate('missing_general.confidence.title')}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
                <span className="text-dark-grey font-inter font-normal sm:text-sm text-xs">
                  {translate('missing_general.confidence.medium')} {translate('missing_general.confidence.title')}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <div className="w-4 h-4 rounded-full bg-red-300"></div>
                <span className="text-dark-grey font-inter font-normal sm:text-sm text-xs">
                  {translate('missing_general.confidence.low')} {translate('missing_general.confidence.title')}
                </span>
              </div>
            </div>
          </div>
        </ScrollWithin>
      </div>
    </div>
  );
};

export default ConfidenceLevel;
