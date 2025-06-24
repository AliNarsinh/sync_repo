import BottomSheet from '@app/components/BottomSheet';
import SdoneSheet from '@app/components/BottomSheet/SdoneSheet';
import SnsIndexSheet from '@app/components/BottomSheet/SnsIndex';
import StressIndexSheet from '@app/components/BottomSheet/StressIndex';
import { useLocalization } from '@app/hooks';
import {
  heartCalculateEmoji,
  heartCalculateText,
  pnsIndexText,
  sd1Emoji,
  sd1Text,
  snsIndexEmoji,
  stressIndexCalculateEmoji,
  getStressIndexText,
} from '@app/utils/emojiCalculation';
import { formatTitle } from '@app/utils/formatTitle';
import { useAnimation } from 'framer-motion';
import React, { memo, useEffect, useState } from 'react';
import HeartRate from '../BottomSheet/HeartRate';
import BlurBackdrop from '@app/components/BackDrop';

const FightAccordion: React.FC<any> = ({ data }) => {
  const controls = useAnimation();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>();

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

  const { translate } = useLocalization();
  const closeOverLay = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div>
        <BlurBackdrop isBottomSheetOpen={isBottomSheetOpen} handleClick={closeOverLay} />
        {!!data?.length &&
          data?.map((item: any) => {
            return (
              <div key={item.title} className="flex  justify-between mt-5">
                <div>
                  <p className="text-xs leading-[19.6px] font-bold text-primary-color w-24">
                    {formatTitle(item?.title, translate).toUpperCase()}
                  </p>
                  <h6
                    className={`text-${item?.value?.value ? '#194396 text-[22px]' : 'gray-400 text-[16px]'} font-inter font-bold leading-[30.8px]`}
                  >
                    {item?.value?.value ?? translate('not_data.NA')}
                  </h6>
                </div>
                <div className="w-40">
                  <h6 className="text-primary-color text-sm font-bold">
                    {formatTitle(item?.title, translate).toUpperCase()} {translate('missing_general.is')} {''}
                    {item?.title === 'snsIndex'
                      ? pnsIndexText(item?.value?.value, translate)
                      : item?.title === 'pulseRate'
                        ? heartCalculateText(item?.value?.value, translate)
                        : item?.title === 'stressIndex'
                          ? getStressIndexText(item?.value?.value, translate)
                          : item?.title === 'sd2'
                            ? sd1Text(item?.value?.value, translate)
                            : null}
                  </h6>
                  <button
                    onClick={() => learnMore(item)}
                    className="font-inter font-medium sm:text-xs text-[11px] leading-[14px] text-[#535353] underline  underline-offset-2 mt-4"
                  >
                    {translate('btn.learn_more')}
                  </button>
                </div>
                <div>
                  {item?.value?.value ? (
                    <img
                      src={
                        item.title === 'snsIndex'
                          ? snsIndexEmoji(item?.value?.value)
                          : item.title === 'pulseRate'
                            ? heartCalculateEmoji(item?.value?.value)
                            : item.title === 'stressIndex'
                              ? stressIndexCalculateEmoji(item?.value?.value)
                              : item.title === 'sd2'
                                ? sd1Emoji(item?.value?.value)
                                : ''
                      }
                      alt="laughinggreen"
                      className="m-auto w-7"
                    />
                  ) : (
                    <h6 className="text-gray-400 text-base font-bold h-11">{translate('not_data.NA')}</h6>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <BottomSheet controls={controls} isBottomSheetOpen={isBottomSheetOpen} closeBottomSheet={closeBottomSheet}>
        {selectedData?.title === 'snsIndex' ? (
          <SnsIndexSheet data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : selectedData?.title === 'pulseRate' ? (
          <HeartRate data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : selectedData?.title === 'stressIndex' ? (
          <StressIndexSheet data={selectedData} />
        ) : selectedData?.title === 'sd2' ? (
          <SdoneSheet data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : null}
      </BottomSheet>
    </>
  );
};

export default memo(FightAccordion);

// export default FightAccordion
