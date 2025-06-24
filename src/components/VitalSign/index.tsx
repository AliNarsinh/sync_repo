import { useEffect, useState } from 'react';
import BreathingRate from '@app/components/BottomSheet/BreathingRate';
import HeartRate from '@app/components/BottomSheet/HeartRate';
import Prq from '@app/components/BottomSheet/Prq';
import { useLocalization } from '@app/hooks';
import { BinnahTypes } from '@app/types/binahTypes';
import {
  breathCalculateEmoji,
  breathCalculateText,
  heartCalculateEmoji,
  heartCalculateText,
  prqCalculateEmoji,
  prqCalculateText,
} from '@app/utils/emojiCalculation';
import { useAnimation } from 'framer-motion';
import BottomSheet from '@app/components/BottomSheet';
import BlurBackdrop from '@app/components/BackDrop';
import ConfidenceLevel from '@app/components/ConfidenceLevel';
import ConfidenceLevelBottomSheet from '@app/components/BottomSheet/ConfidenceLevel';

const VitalSign = ({ vitalData }: any) => {
  const { translate } = useLocalization();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>();
  const [selectedType, setSelectedType] = useState<any>();

  const formatTitle = (title: any, translate: any) => {
    const formattedTitle = title.replace(/([a-z])([A-Z])/g, '$1 $2');
    const finalValue = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
    return translate(`missing_general.over_all.${finalValue}`);
  };

  const controls = useAnimation();

  const closeBottomSheet = () => {
    controls.start({ y: '100%' });
    setIsBottomSheetOpen(false);
    setSelectedData(null);
    setSelectedType(null);
  };

  useEffect(() => {
    if (isBottomSheetOpen) {
      controls.start({ y: 0 });
    } else {
      controls.start({ y: '100%' });
    }
  }, [isBottomSheetOpen, controls]);

  const learnMore = (data: any, type?: string) => {
    setSelectedType(null);
    setIsBottomSheetOpen(true);
    setSelectedData(data);
  };

  const handleConfidence = (data: any, type?: string) => {
    setSelectedData(null);
    setIsBottomSheetOpen(true);
    setSelectedType({ ...data, type });
  };

  const backhandler = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div>
      <BlurBackdrop isBottomSheetOpen={isBottomSheetOpen} handleClick={backhandler} />
      <h4 className="font-inter font-extrabold text-sm leading-[19.6px] text-primary-color mb-2 mt-5">
        {translate('vital_signs.main_heading')}
      </h4>
      {vitalData?.map((data: any) => (
        <div key={data?.title} className="sm:pt-6 sm:pb-4 py-1">
          <div className="border border-[#E6E6E6] rounded-lg p-4 mb-4 custom-shadow">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center justify-normal gap-3">
                <img
                  src={
                    data?.title === BinnahTypes.HEART_RATE
                      ? heartCalculateEmoji(data?.value?.value)
                      : data?.title === BinnahTypes.BREATHING_RATE
                        ? breathCalculateEmoji(data?.value?.value)
                        : data?.title === BinnahTypes.PRQ
                          ? prqCalculateEmoji(data?.value?.value)
                          : ''
                  }
                  alt="smile"
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
                  {data?.value?.value ?? translate('not_data.NA')}

                  {data?.value?.value && (
                    <small className="font-inter font-medium text-[10px] leading-[14px] text-dark-grey"> bpm</small>
                  )}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <h6 className="font-inter font-semibold sm:text-base text-sm leading-[19.6px] text-primary-color mb-1">
                {formatTitle(data?.title, translate)} {translate('missing_general.is')}{' '}
                {data?.title === BinnahTypes.HEART_RATE
                  ? heartCalculateText(data?.value?.value, translate) ?? translate('not_data.NA')
                  : data?.title === BinnahTypes.BREATHING_RATE
                    ? breathCalculateText(data?.value?.value, translate) ?? translate('not_data.NA')
                    : data?.title === BinnahTypes.PRQ
                      ? prqCalculateText(data?.value?.value, translate) ?? translate('not_data.NA')
                      : ''}
              </h6>
              <p className="font-inter font-normal leading-[16.8px] sm:text-sm text-xs text-primary-color my-3">
                {data?.value?.value ? translate(`vital_signs.${data?.title}.intro`) : translate(`not_data.title`)}
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
                onClick={() => handleConfidence(data, 'ConfidenceLevel')}
                value={data?.value?.confidenceLevel}
              />
            )}
          </div>
        </div>
      ))}
      <BottomSheet controls={controls} isBottomSheetOpen={isBottomSheetOpen} closeBottomSheet={closeBottomSheet}>
        {selectedType?.type === BinnahTypes.CONFIDENCE_LEVEL ? (
          <ConfidenceLevelBottomSheet data={selectedType} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : selectedData?.title === BinnahTypes.HEART_RATE ? (
          <HeartRate data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : selectedData?.title === BinnahTypes.BREATHING_RATE ? (
          <BreathingRate data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : (
          <Prq data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        )}
      </BottomSheet>
    </div>
  );
};

export default VitalSign;
