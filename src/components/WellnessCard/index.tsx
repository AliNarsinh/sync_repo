import { smile } from '@app/assets/images';

const WellnessCard = ({ data }: any) => {
  return (
    <div>
      <div className="sm:pt-6 sm:pb-4 py-1">
        <div className="border border-[#E6E6E6] rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center justify-normal gap-3">
              <img src={smile} alt="smile" />
              <h6 className="font-inter font-bold text-sm leading-[19.6px] text-primary-color">Heart Rate</h6>
            </div>
            <div>
              <span className="text-[#194396] font-inter font-bold text-[22px] leading-[30.8px]">
                69<small className="font-inter font-medium text-[10px] leading-[14px] text-dark-grey">bpm</small>
              </span>
            </div>
          </div>
          <div>
            <h6 className="font-inter font-semibold sm:text-base text-sm leading-[19.6px] text-primary-color mb-1">
              Your Heart Rate is Normal
            </h6>
            <p className="font-inter font-normal leading-[16.8px] sm:text-sm text-xs text-primary-color mb-1">
              Number of heartbeats per minute. Normal resting rate is 60 to 100
            </p>
            <p className="font-inter font-medium sm:text-xs text-[10px] leading-[14px] text-[#194396] underline mb-1">
              Learn More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessCard;
