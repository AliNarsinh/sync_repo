import { ArrowLeftIcon } from '@app/assets/images/icons';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  title?: string;
  className?: string;
  backRoute?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, className, backRoute }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (backRoute) {
      navigate(backRoute);
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className={clsx('container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 py-8 relative height-10vh', className)}
    >
      <div className="cursor-pointer absolute">
        <div className="text-small-icon cursor-pointer">
          <ArrowLeftIcon onClick={goBack} />
        </div>
      </div>
      {title ? (
        <h1 className="font-inter font-semibold text-xl leading-5 text-center text-primary-color">{title}</h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
