import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalization } from '@app/hooks';
import { crossIcon } from '@app/assets/images';
import { APP_ROUTES } from '@app/constants';

type Props = {
  error: boolean;
  redirectUrl?: string;
  setError: (error: boolean) => void;
  showNav?: boolean;
  tutorialUrl?: string;
  errorSource?: string;
};

const TryAgain: React.FC<Props> = ({ error, setError, redirectUrl, showNav = true, tutorialUrl, errorSource }) => {
  const { translate } = useLocalization();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(redirectUrl ? redirectUrl : APP_ROUTES.measure_skin);
    setError(false);
  };

  return (
    <section className="bg-custom-gradient fixed top-0 left-0 z-20 w-full h-screen">
      <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
        <div className="flex flex-col items-center justify-center sm:gap-4 gap-3 pt-32">
          <img src={crossIcon} alt="logo" />
          <p className="font-inter font-medium sm:text-base text-[15px] leading-[21px] text-dark-grey text-center">
            {translate('try_again.image_title')}
          </p>
          <p className="font-inter font-medium sm:text-base text-[15px] leading-[21px] text-dark-grey text-center">
            {translate('missing_general.api_response')} {translate(`missing_general.${errorSource}`)}.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-tl-[18px] rounded-tr-[18px] absolute w-full bottom-0">
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 text-center flex flex-col items-center justify-center sm:gap-4 gap-4 smpy-5 py-9">
          <div>
            <p className="font-inter font-medium sm:text-base text-[15px] leading-[21px] text-dark-grey">
              {translate('try_again.error_one')}
            </p>
            <p className="font-inter font-medium sm:text-base text-[15px] leading-[21px] text-dark-grey">
              {translate('try_again.error_two')}
            </p>
          </div>
          <button
            type="submit"
            onClick={() => handleBack()}
            className="w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300"
          >
            {translate('try_again.btn_label')}
          </button>
          <Link
            to={tutorialUrl as string}
            className="font-inter font-normal sm:text-lg text-sm leading-[22.4px] text-dark-grey hover:underline"
          >
            {translate('try_again.instructions')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TryAgain;
