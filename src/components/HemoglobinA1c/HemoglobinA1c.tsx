import BlurBackdrop from '@app/components/BackDrop';
import HemoglobinA1cSheet from '@app/components/BottomSheet/HemoglobinA1cSheet';
import { useLocalization } from '@app/hooks';
import { hba1cEmoji, hba1cText, diabetesRiskEmoji, diabetesRiskText } from '@app/utils/emojiCalculation';
import { formatTitle } from '@app/utils/formatTitle';
import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import BottomSheet from '../BottomSheet';
import { BinnahTypes } from '@app/types/binahTypes';
import DiabetesRisk from '@app/components/BottomSheet/DiabetesRisk';
import ConfidenceLevel from '@app/components/ConfidenceLevel';

const HemoglobinA1c: React.FC<any> = ({ hemoglobinA1c }) => {
  const { translate } = useLocalization();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>();

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

  const closeOverLay = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div>
      <BlurBackdrop isBottomSheetOpen={isBottomSheetOpen} handleClick={closeOverLay} />
      <h4 className="font-inter font-extrabold text-sm leading-[19.6px] text-primary-color mb-2">
        {translate('hemoglobinA1c_main.main_heading')}
      </h4>
      {hemoglobinA1c?.map((data: any) => {
        return (
          <div key={data?.title} className="sm:pt-6 sm:pb-4 py-1">
            <div className="border border-[#E6E6E6] rounded-lg p-4 mb-4 custom-shadow">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center justify-normal gap-3">
                  <img
                    src={
                      data?.title === BinnahTypes.HEMOGLOBINALC
                        ? hba1cEmoji(data?.value?.value)
                        : diabetesRiskEmoji(data?.value?.value)
                    }
                    alt="smile"
                    className="w-8"
                  />
                  <h6 className="font-inter font-bold text-sm leading-[19.6px] text-primary-color">
                    {formatTitle(data?.title, translate) ?? translate('not_data.NA')}
                  </h6>
                </div>
                <div>
                  <span
                    className={`text-${data?.value?.value ? '[#194396] text-[22px]' : 'gray-400 text-[22px]'} font-inter font-bold leading-[30.8px]`}
                  >
                    {data?.value?.value ? (
                      data?.title === BinnahTypes.HEMOGLOBINALC ? (
                        `${parseFloat(data?.value?.value.toFixed(1))}%`
                      ) : (
                        diabetesRiskText(data?.value?.value, translate)
                      )
                    ) : (
                      <span className="text-[22px]">{translate('not_data.NA')}</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <h6 className="font-inter font-semibold sm:text-base text-sm leading-[19.6px] text-primary-color mb-1">
                  {formatTitle(data?.title, translate)} {translate('missing_general.is')}{' '}
                  {data?.title === BinnahTypes.HEMOGLOBINALC
                    ? hba1cText(data?.value?.value, translate) ?? translate('not_data.NA')
                    : diabetesRiskText(data?.value?.value, translate) ?? translate('not_data.NA')}
                </h6>
                <p className="font-inter font-normal leading-[16.8px] sm:text-sm text-xs text-primary-color my-3">
                  {data?.value?.value
                    ? translate(`hemoglobinA1c_main.${data?.title}.intro`)
                    : translate(`not_data.title`)}
                </p>

                <button
                  className="font-inter font-medium sm:text-xs text-[10px] leading-[14px] text-[#194396] underline mb-1"
                  onClick={() => learnMore(data)}
                >
                  {translate('btn.learn_more')}
                </button>
              </div>
              {data?.value?.confidenceLevel && <ConfidenceLevel value={data?.value?.confidenceLevel} />}
            </div>
          </div>
        );
      })}
      <BottomSheet controls={controls} isBottomSheetOpen={isBottomSheetOpen} closeBottomSheet={closeBottomSheet}>
        {selectedData?.title === BinnahTypes.HEMOGLOBINALC ? (
          <HemoglobinA1cSheet data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : (
          <DiabetesRisk data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        )}
      </BottomSheet>
    </div>
  );
};

export default HemoglobinA1c;
