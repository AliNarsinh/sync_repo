import { useEffect, useState } from 'react';
import BloodPressure from '@app/components/BottomSheet/BloodPressure';
import { useLocalization } from '@app/hooks';
import {
  BloodPressureCalculateEmoji,
  bloodText,
  hemoglobinEmoji,
  hemoglobinText,
  hypertensionRiskEmoji,
  hypertensionRiskText,
} from '@app/utils/emojiCalculation';
import { formatTitle } from '@app/utils/formatTitle';
import { useAnimation } from 'framer-motion';
import BottomSheet from '../BottomSheet';
import { BinnahTypes } from '@app/types/binahTypes';
import BlurBackdrop from '@app/components/BackDrop';
import Homoglobin from '@app/components/BottomSheet/Homoglobin';
import HypertensionRisk from '@app/components/BottomSheet/HypertensionRisk';
import ConfidenceLevel from '@app/components/ConfidenceLevel';

const Blood: React.FC<any> = ({ bloodPressure, userData }) => {
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

  const gender = userData.find((item: any) => item.title === 'gender')?.value.toLowerCase() as any;

  return (
    <div>
      <BlurBackdrop isBottomSheetOpen={isBottomSheetOpen} handleClick={closeOverLay} />
      <h4 className="font-inter font-extrabold text-sm leading-[19.6px] text-primary-color mb-2">
        {translate('blood.main_heading')}
      </h4>
      {bloodPressure?.map((data: any) => {
        return (
          <div key={data?.title} className="sm:pt-6 sm:pb-4 py-1">
            <div className="border border-[#E6E6E6] rounded-lg p-4 mb-4 custom-shadow">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center justify-normal gap-3">
                  <img
                    src={
                      data?.title === 'hemoglobin'
                        ? hemoglobinEmoji(data?.value?.value, gender)
                        : data.title === 'hypertensionRisk'
                          ? hypertensionRiskEmoji(data?.value?.value)
                          : BloodPressureCalculateEmoji(data?.value?.value?.systolic)
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
                    {data.title === 'hemoglobin' ? (
                      `${data?.value?.value ?? translate('not_data.NA')}`
                    ) : data.title === 'hypertensionRisk' ? (
                      hypertensionRiskText(data?.value?.value, translate) ?? translate('not_data.NA')
                    ) : data?.value?.value?.systolic && data?.value?.value?.diastolic ? (
                      <>
                        {data?.value?.value?.systolic}/{data?.value?.value?.diastolic}
                      </>
                    ) : (
                      translate('not_data.NA')
                    )}

                    <small className="font-inter font-medium text-[10px] leading-[14px] text-dark-grey">
                      {data.title === 'hemoglobin'
                        ? data?.value?.value && ' g/dL'
                        : data?.value?.value?.systolic && data?.value?.value?.diastolic && ' mmHg'}
                    </small>
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <h6 className="font-inter font-semibold sm:text-base text-sm leading-[19.6px] text-primary-color mb-1">
                  {formatTitle(data?.title, translate)} {translate('missing_general.is')} &nbsp;
                  {data?.title === 'hemoglobin'
                    ? hemoglobinText(data?.value?.value, translate, gender) ?? translate('not_data.NA')
                    : data.title === 'hypertensionRisk'
                      ? hypertensionRiskText(data?.value?.value, translate) ?? translate('not_data.NA')
                      : bloodText(data?.value?.value?.systolic, translate) ?? translate('not_data.NA')}
                </h6>

                {/* intro */}
                <p className="font-inter font-normal leading-[16.8px] sm:text-sm text-xs text-primary-color my-3">
                  {data?.value?.value || data?.value?.value?.systolic || data?.value?.value?.diastolic
                    ? translate(`blood.${data?.title}.intro`)
                    : translate('not_data.title')}
                </p>

                {data?.title === 'hemoglobin' && data?.value?.value && (
                  <>
                    <p className="font-inter font-normal m:text-sm text-xs text-primary-color">
                      {translate(`blood.${data?.title}.intro_one`)}
                    </p>
                    <p className="font-inter font-normal sm:text-sm text-xs text-primary-color mb-1">
                      {translate(`blood.${data?.title}.intro_two`)}
                    </p>
                  </>
                )}

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
        {BinnahTypes.BLOOD_PRESSURE === selectedData?.title ? (
          <BloodPressure data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : selectedData?.title === BinnahTypes.HYPERTENSION_RISK ? (
          <HypertensionRisk data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : BinnahTypes.HEMOGLOBIN === selectedData?.title ? (
          <Homoglobin data={selectedData} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        ) : null}
      </BottomSheet>
    </div>
  );
};

export default Blood;
