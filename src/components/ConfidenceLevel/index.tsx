import { getConfidenceColor, getConfidenceText } from '@app/utils/emojiCalculation';
import { useLocalization } from '@app/hooks';

interface ConfidenceLevelProps {
  value: number;
  onClick?: () => void;
}

const ConfidenceLevel = ({ value, onClick }: ConfidenceLevelProps) => {
  const { translate } = useLocalization();
  return (
    <div className="flex items-center gap-2 mt-3">
      <div className={`w-3 h-3 rounded-full ${getConfidenceColor(value)}`}></div>
      <button
        onClick={onClick}
        className="font-inter font-semibold leading-[16.8px] sm:text-sm text-xs text-[#535353] underline mb-1 underline-offset-2"
      >
        {translate('missing_general.confidence_Level')} {translate('missing_general.is')}:{' '}
        {getConfidenceText(value, translate)}
      </button>
    </div>
  );
};

export default ConfidenceLevel;
