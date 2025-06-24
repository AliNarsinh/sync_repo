import { MinusIcon, PlusIcon } from '@app/assets/images/icons';
import React, { useEffect, useState } from 'react';

import Accordian from '@app/components/Accordian';
import RateVariabilityAccordian from '@app/components/Accordian/RateVariabilityAccordian';
import BlurBackdrop from '@app/components/BackDrop';
import BottomSheet from '@app/components/BottomSheet';
import SdnnSheet from '@app/components/BottomSheet/SdnnSheet';
import { useLocalization } from '@app/hooks';
import { sdnnEmoji, sdnnText } from '@app/utils/emojiCalculation';
import { useAnimation } from 'framer-motion';
import ConfidenceLevel from '@app/components/ConfidenceLevel';
import { BinnahTypes } from '@app/types/binahTypes';
import ConfidenceLevelBottomSheet from '@app/components/BottomSheet/ConfidenceLevel';

const RateVariability: React.FC<any> = ({ rateVariability }) => {
  const { translate } = useLocalization();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [selectAccordion, setSelectAccordion] = useState<any>();

  const filterRateVariability = rateVariability?.filter((data: any) => data?.title === 'sdnn');
  const exceptRateVariability = rateVariability?.filter((data: any) => data?.title !== 'sdnn');

  const controls = useAnimation();

  const closeBottomSheet = () => {
    controls.start({ y: '100%' });
    setIsBottomSheetOpen(false);
    setSelectedData(null);
  };

  useEffect(() => {
    if (isBottomSheetOpen) {
      controls.start({ y: 0 });
    } else {
      controls.start({ y: '100%' });
    }
  }, [isBottomSheetOpen, controls]);

  const learnMore = (data: any) => {
    setIsBottomSheetOpen(true);
    setSelectedData(data);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSelectAccordion(isOpen ? null : exceptRateVariability);
  };

  const closeOverLay = () => {
    setIsBottomSheetOpen(false);
  };

  const handleConfidence = (data: any, type?: string) => {
    setIsBottomSheetOpen(true);
    setSelectedData({ ...data, type });
  };

  return (
    <>
      <div>
        <BlurBackdrop isBottomSheetOpen={isBottomSheetOpen} handleClick={closeOverLay} />
        <h4 className="font-inter font-extrabold text-sm leading-[19.6px] text-primary-color mb-2">
          {translate('rate_variablity.main_heading')}
        </h4>
        {filterRateVariability?.map((data: any) => (
          <div key={data?.title} className="sm:pt-6 sm:pb-4 py-1">
            <div className="border border-[#E6E6E6] rounded-lg p-4 mb-4 custom-shadow">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center justify-normal gap-3">
                  <img src={sdnnEmoji(data?.value?.value)} alt="smile" className="w-8" />
                </div>
                <div>
                  <span
                    className={`text-${data?.value?.value ? '[#194396]' : 'gray-400'} font-inter font-bold text-[22px] leading-[30.8px]`}
                  >
                    {data?.value?.value !== null && data?.value?.value !== undefined
                      ? data?.value?.value + 'ms'
                      : translate('not_data.NA')}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <h6 className="font-inter font-semibold sm:text-base text-sm leading-[19.6px] text-primary-color mb-1">
                  {translate('health_settings.setting_3')} {translate('missing_general.is')}{' '}
                  {sdnnText(data?.value?.value, translate) ?? translate('not_data.NA')}
                </h6>
                <p className="font-inter font-normal leading-[16.8px] sm:text-sm text-xs text-primary-color my-3">
                  {data?.value?.value ? translate(`rate_variablity.${data?.title}.intro`) : translate(`not_data.title`)}
                </p>
                <button
                  className="font-inter font-medium sm:text-xs text-[10px] leading-[14px] text-[#194396] underline mb-1"
                  onClick={() => learnMore(data)}
                >
                  {translate('btn.learn_more')}
                </button>
              </div>
              {data?.value?.confidenceLevel && (
                <ConfidenceLevel
                  onClick={() => handleConfidence(data, BinnahTypes.CONFIDENCE_LEVEL)}
                  value={data?.value?.confidenceLevel}
                />
              )}
              <div className="h-0.5 w-full bg-gray-200 mt-6 rounded"></div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs leading-[19.6px]  text-primary-color">{translate('btn.show_results')}</p>
                <div className="w-5 h-5 border border-gray-400 rounded-full relative">
                  <button
                    onClick={handleToggle}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-none outline-none"
                  >
                    {isOpen ? (
                      <MinusIcon className="text-sm text-gray-400" />
                    ) : (
                      <PlusIcon className="text-sm text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <Accordian isOpen={isOpen}>
                <RateVariabilityAccordian data={selectAccordion} />
              </Accordian>
            </div>
          </div>
        ))}
      </div>
      <BottomSheet controls={controls} isBottomSheetOpen={isBottomSheetOpen} closeBottomSheet={closeBottomSheet}>
        {selectedData?.type === BinnahTypes.CONFIDENCE_LEVEL ? (
          <ConfidenceLevelBottomSheet data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : (
          <SdnnSheet data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        )}
      </BottomSheet>
    </>
  );
};

export default RateVariability;
