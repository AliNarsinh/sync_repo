import BlurBackdrop from '@app/components/BackDrop';
import BreathingRate from '@app/components/BottomSheet/BreathingRate';
import { useLocalization } from '@app/hooks';
import { breathCalculateEmoji, breathCalculateText } from '@app/utils/emojiCalculation';
import { formatTitle } from '@app/utils/formatTitle';
import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import BottomSheet from '../BottomSheet';
import ConfidenceLevel from '@app/components/ConfidenceLevel';
import ConfidenceLevelBottomSheet from '@app/components/BottomSheet/ConfidenceLevel';
import { BinnahTypes } from '@app/types/binahTypes';

const Respiration: React.FC<any> = ({ respirationData }) => {
  const { translate } = useLocalization();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>();

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

  const closeOverLay = () => {
    setIsBottomSheetOpen(false);
  };

  const handleConfidence = (data: any, type?: string) => {
    setIsBottomSheetOpen(true);
    setSelectedData({ ...data, type });
  };

  return (
    <div>
      <BlurBackdrop isBottomSheetOpen={isBottomSheetOpen} handleClick={closeOverLay} />
      <h4 className="font-inter font-extrabold text-sm leading-[19.6px] text-primary-color mb-2">
        {translate('respirationRate.main_heading')}
      </h4>
      {respirationData?.map((data: any) => {
        return (
          <div key={data?.title} className="sm:pt-6 sm:pb-4 py-1">
            <div className="border border-[#E6E6E6] rounded-lg p-4 mb-4 custom-shadow">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center justify-normal gap-3">
                  <img src={breathCalculateEmoji(data?.value?.value)} alt="smile" className="w-8" />
                  <h6 className="font-inter font-bold text-sm leading-[19.6px] text-primary-color">
                    {formatTitle(data?.title, translate)}
                  </h6>
                </div>
                <div>
                  <span
                    className={`text-${data?.value?.value ? '[#194396]' : 'gray-400'} font-inter font-bold text-[22px] leading-[30.8px]`}
                  >
                    {`${data?.value?.value}` || translate('not_data.NA')}
                    {data?.value?.value && (
                      <small className="font-inter font-medium text-[10px] leading-[14px] text-dark-grey"> bpm</small>
                    )}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <h6 className="font-inter font-semibold sm:text-base text-sm leading-[19.6px] text-primary-color mb-1">
                  {formatTitle(data?.title, translate)} {translate('missing_general.is')} &nbsp;
                  {breathCalculateText(data?.value?.value, translate) ?? translate('not_data.NA')}
                </h6>

                <p className="font-inter font-normal m:text-sm text-xs text-primary-color my-3">
                  {data?.value?.value ? translate(`vital_signs.${data?.title}.intro`) : translate('not_data.title')}
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
            </div>
          </div>
        );
      })}
      <BottomSheet controls={controls} isBottomSheetOpen={isBottomSheetOpen} closeBottomSheet={closeBottomSheet}>
        {selectedData?.type === BinnahTypes.CONFIDENCE_LEVEL ? (
          <ConfidenceLevelBottomSheet data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : (
          <BreathingRate data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        )}
      </BottomSheet>
    </div>
  );
};

export default Respiration;
