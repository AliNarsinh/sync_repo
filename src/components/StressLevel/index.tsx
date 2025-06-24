import { MinusIcon, PlusIcon } from '@app/assets/images/icons';
import Accordian from '@app/components/Accordian';
import StressAccordion from '@app/components/Accordian/stressAccordion';
import BottomSheet from '@app/components/BottomSheet';
import StressLevelSheet from '@app/components/BottomSheet/StressLevel';
import { useLocalization } from '@app/hooks';
import {
  normalizedStressIndexCalculateEmoji,
  normalizedStressIndexCalculateText,
  stressLevelCalculateEmoji,
  stressLevelCalculateText,
} from '@app/utils/emojiCalculation';
import { formatTitle } from '@app/utils/formatTitle';
import { useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import BlurBackdrop from '@app/components/BackDrop';
import ConfidenceLevel from '@app/components/ConfidenceLevel';
import NormalizedStressIndex from '../BottomSheet/NormalizedStressIndex';
import { BinnahTypes } from '@app/types/binahTypes';

const StressLevel: React.FC<any> = ({ stressLevel }) => {
  const { translate } = useLocalization();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>();
  const [selectAccordion, setSelectAccordion] = useState<any>();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const filterStressLevel = stressLevel?.filter(
    (data: any) => data?.title === 'stressLevel' || data?.title === BinnahTypes.NORMALIZED_STRESS_INDEX,
  );

  const filterStressIndex = stressLevel?.filter((data: any) => data?.title === 'stressIndex');

  const controls = useAnimation();

  const closeBottomSheet = () => {
    controls.start({ y: '100%' });
    setIsBottomSheetOpen(false);
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
    setSelectAccordion(isOpen ? null : filterStressIndex);
  };

  const closeOverLay = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div>
        <BlurBackdrop isBottomSheetOpen={isBottomSheetOpen} handleClick={closeOverLay} />
        <h4 className="font-inter font-extrabold text-sm leading-[19.6px] text-primary-color mb-2">
          {' '}
          {stressLevel.title === BinnahTypes.NORMALIZED_STRESS_INDEX
            ? translate('stress.normalizedStressIndex.title')
            : translate('stress.main_heading')}
        </h4>
        {filterStressLevel?.map((data: any) => (
          <div key={data.title} className="sm:pt-6 sm:pb-4 py-1">
            <div className="border border-[#E6E6E6] rounded-lg p-4 mb-4 custom-shadow">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center justify-normal gap-3">
                  <img
                    src={
                      data.title === 'stressLevel'
                        ? stressLevelCalculateEmoji(data.value.value)
                        : data.title === BinnahTypes.NORMALIZED_STRESS_INDEX
                          ? normalizedStressIndexCalculateEmoji(data.value.value)
                          : ''
                    }
                    alt="emoji"
                    className="w-8"
                  />
                  <h6 className="font-inter font-bold text-sm leading-[19.6px] text-primary-color">
                    {formatTitle(data?.title, translate)}
                  </h6>
                </div>
                <div>
                  <span
                    className={`text-${data?.value?.value ? '[#194396]' : 'gray-400'} font-inter font-bold text-[22px] leading-[30.8px]`}
                  >
                    {stressLevelCalculateText(data?.value?.value, translate) ?? translate('not_data.NA')}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <h6 className="font-inter font-semibold sm:text-base text-sm leading-[19.6px] text-primary-color mb-1">
                  {data.title === BinnahTypes.NORMALIZED_STRESS_INDEX
                    ? translate('stress.normalizedStressIndex.title')
                    : translate('missing_general.over_all.Stress Level')}{' '}
                  {translate('missing_general.is')}{' '}
                  {(data.title === BinnahTypes.NORMALIZED_STRESS_INDEX
                    ? normalizedStressIndexCalculateText(data.value.value, translate)
                    : stressLevelCalculateText(data.value.value, translate)) ?? 'N/A'}
                </h6>
                <p className="font-inter font-normal leading-[16.8px] sm:text-sm text-xs text-primary-color mb-3 mt-3">
                  {data?.value?.value ? translate(`stress.${data?.title}.intro`) : translate(`not_data.title`)}
                </p>
                <button
                  className="font-inter font-medium sm:text-xs text-[10px] leading-[14px] text-[#194396] underline mb-1"
                  onClick={() => learnMore(data)}
                >
                  {translate('btn.learn_more')}
                </button>
              </div>
              {data.title === 'stressLevel' ? (
                <>
                  {' '}
                  {data?.value?.confidenceLevel && <ConfidenceLevel value={data?.value?.confidenceLevel} />}
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
                    <StressAccordion data={selectAccordion} />
                  </Accordian>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <BottomSheet controls={controls} isBottomSheetOpen={isBottomSheetOpen} closeBottomSheet={closeBottomSheet}>
        {selectedData?.title === BinnahTypes.NORMALIZED_STRESS_INDEX ? (
          <>
            <NormalizedStressIndex data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
          </>
        ) : (
          <>
            <StressLevelSheet data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
          </>
        )}
      </BottomSheet>
    </>
  );
};

export default StressLevel;
