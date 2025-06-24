import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faRightToBracket,
  faArrowLeft,
  faPenToSquare,
  faAngleRight,
  faCircleUser,
  faGear,
  faRightFromBracket,
  faMagnifyingGlass,
  faCircleInfo,
  faBook,
  faHeart,
  faBars,
  faHome,
  faCalendar,
  faPlus,
  faMinus,
  faHouse,
  faCircleExclamation,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';

const MailIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faEnvelope} {...props} />;
const LockIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faLock} {...props} />;
const EyeOpenIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faEye} {...props} />;
const EyeClosedIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faEyeSlash} {...props} />;
const RightToBracketIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon icon={faRightToBracket} {...props} />
);

const HouseIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faHouse} {...props} />;

const ArrowLeftIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faArrowLeft} {...props} />;
const SquarePenIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon icon={faPenToSquare} {...props} />
);
const AngleRightIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon icon={faAngleRight} {...props} />
);
const EnvelopIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faMessage} {...props} />;

const UserCircleIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon icon={faCircleUser} {...props} />
);

const SettingsIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faGear} {...props} />;
const LogoutIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon icon={faRightFromBracket} {...props} />
);
const SearchIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon icon={faMagnifyingGlass} {...props} />
);
const CircleInfoIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon icon={faCircleInfo} {...props} />
);
const BookIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faBook} {...props} />;
const HeartIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faHeart} {...props} />;
const BarsIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faBars} {...props} />;
const HomeIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faHome} {...props} />;
const CalanderIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faCalendar} {...props} />;
const PlusIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faPlus} {...props} />;
const MinusIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon={faMinus} {...props} />;
const FaCircleExclamationIcon = (props?: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon icon={faCircleExclamation} {...props} />
);

export {
  MailIcon,
  LockIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  RightToBracketIcon,
  ArrowLeftIcon,
  SquarePenIcon,
  AngleRightIcon,
  UserCircleIcon,
  SettingsIcon,
  LogoutIcon,
  SearchIcon,
  CircleInfoIcon,
  BookIcon,
  HeartIcon,
  BarsIcon,
  HomeIcon,
  CalanderIcon,
  PlusIcon,
  MinusIcon,
  HouseIcon,
  FaCircleExclamationIcon,
  EnvelopIcon,
};
