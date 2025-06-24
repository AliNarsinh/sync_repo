import { arrow, clocktwo, square } from '@app/assets/images';
import { APP_ROUTES } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { formatDateTime, getDateLanguage } from '@app/utils/dateFormatter';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: TabTwoPropsTypes;
};

type TabTwoPropsTypes = {
  _id: string;
  integration: number;
  sessionData: {
    check_datetime: string;
    colored_s3_url: string;
    desease: string;
    image_url?: string;
  };
};

const ListingCard: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { i18n } = useLocalization();
  const currentLanguage = getDateLanguage(i18n.language);

  const handleredirect = (item: TabTwoPropsTypes) => {
    navigate(`${APP_ROUTES.recommand}/${item?._id}`);
  };

  return (
    <div>
      <div className=" border-t border-b border-[#D7D7D7] py-3 sm:px-0 px-3">
        <div className="bg-white w-full flex justify-between items-center p-3 rounded-lg">
          <div className="flex items-center justify-normal gap-3">
            <img src={square} alt="square" />
            <div className="flex flex-col gap-1 mr-1">
              <h6 className="font-inter font-semibold text-base leading-[22.4px] text-primary-color">
                {data?.sessionData?.desease}
              </h6>
              <div className="flex items-center justify-normal gap-1">
                <img src={clocktwo} alt="clocktwo" />
                <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-[#646464CC]">
                  {formatDateTime(data?.sessionData?.check_datetime, currentLanguage)}
                </p>
              </div>
            </div>
          </div>
          <button onClick={() => handleredirect(data)}>
            <img src={arrow} alt="arrow" className="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
