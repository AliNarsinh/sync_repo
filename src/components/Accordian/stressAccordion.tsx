import BlurBackdrop from '@app/components/BackDrop';
import BottomSheet from '@app/components/BottomSheet';
import { useLocalization } from '@app/hooks';
import { getStressIndexText, stressIndexCalculateEmoji } from '@app/utils/emojiCalculation';
import { useAnimation } from 'framer-motion';
import React, { memo, useEffect, useState } from 'react';
import StressIndex from '../BottomSheet/StressIndex';

const StressAccordion: React.FC<any> = ({ data }) => {
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
                  <p className="text-sm leading-[19.6px] font-bold text-primary-color h-11">Stress index</p>
                  <h6
                    className={`text-xl font-bold leading-[19.6px] mt-2 ${data?.value?.value ? 'text-primary-color' : 'text-gray-400'}`}
                  >
                    {item?.value?.value ?? translate('not_data.NA')}
                  </h6>
                </div>
                <div className="w-36">
                  <h6 className="text-primary-color text-sm font-bold">
                    {translate('missing_general.over_all.Stress Index')} {translate('missing_general.is')}{' '}
                    {getStressIndexText(item?.value?.value, translate) ?? translate('not_data.NA')}
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
                    <img src={stressIndexCalculateEmoji(item?.value?.value)} alt="pic" className="m-auto" />
                  ) : (
                    <h6 className="text-gray-400 text-base font-bold h-11">{translate('not_data.NA')}</h6>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <BottomSheet controls={controls} isBottomSheetOpen={isBottomSheetOpen} closeBottomSheet={closeBottomSheet}>
        <StressIndex data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
      </BottomSheet>
    </>
  );
};

export default memo(StressAccordion);
