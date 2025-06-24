import { arrow } from '@app/assets/images';
import { APP_ROUTES } from '@app/constants';
import { useTypedDispatch } from '@app/store';
import { predictSkinive, predictSkiniveDetail } from '@app/store/actions';
import { convertProbablityIntoPercentage, getRingImage } from '@app/utils/probablityCalculate';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalization } from '@app/hooks';
import { TopnItem } from '@app/store/type';

interface RecommandListProps {
  item: TopnItem;
  skiniveDetailsData: Record<string, any>;
}

const RecommandList: React.FC<RecommandListProps> = ({ item, skiniveDetailsData }) => {
  const { translate } = useLocalization();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(predictSkinive(skiniveDetailsData as any));
    dispatch(predictSkiniveDetail(item));
    navigate(APP_ROUTES.results);
  };

  const ringImage = getRingImage(item?.prob, item?.class);
  return (
    <div className="flex justify-between items-center border rounded-lg border-[#D7D7D7] py-5 px-4 mt-4">
      <div className="flex items-center justify-normal gap-3 w-full">
        <div className="relative w-1/5">
          <img src={ringImage} className="w-full" alt="ringone" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <span className="text-extra-small">{convertProbablityIntoPercentage(item?.prob, item?.class)}%</span>
          </div>
        </div>
        <div className="w-4/5">
          <h6 className="font-inter font-bold sm:text-base text-sm leading-[19.6px] text-primary-color">
            {item?.class}
          </h6>
          <p className="font-inter font-normal leading-[16.8px] sm:text-sm text-xs text-primary-color pr-2.5">
            {item?.description}
          </p>
          <p className="font-inter font-medium sm:text-xs text-[10px] leading-[14px] text-secondary-color underline">
            <Link to="/results">{translate('recommand.description')}</Link>
          </p>
        </div>
      </div>
      <div>
        <button onClick={handleSubmit}>
          <img src={arrow} alt="ringone" />
        </button>
      </div>
    </div>
  );
};

export default RecommandList;
