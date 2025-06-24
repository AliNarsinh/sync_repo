export const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
// export const baseUrl = 'http://localhost:3000';
export const defaultCompanyCode = process.env.REACT_APP_DEFAULT_COMPANY_CODE;
export const imageUrlPrefix = process.env.REACT_APP_IMAGE_URL_PREFIX;
export const DISABLE_ERROR_NOTIFICATION_FOR_URLS = [];
export const BINAH_LIECENSE_KEY = process.env.REACT_APP_BINAH_LIECENSE_KEY;
export const APP_NAME = process.env.REACT_APP_NAME;
export const FEEDBACK_EMAIL = process.env.REACT_APP_FEEDBACK_EMAIL;
export const IS_RUSSIAN = process.env.REACT_APP_IS_RUSSIAN === 'true' ? true : false;
export const DEFAULT_MEASUREMENT_DURATION = 70;
export const MIN_MEASUREMENT_DURATION = 20;
export const MAX_MEASUREMENT_DURATION = 70;

export const LANGS = {
  ENGLISH: 'ENGLISH',
  RUSSIAN: 'RUSSIAN',
};

export const LANGS_EN = {
  ENGLISH: 'en',
  RUSSIAN: 'ru',
};

export const APP_ROUTES = {
  login: '/login',
  signup: '/signup',
  forgot_password: '/forgot_password',
  reset_password: '/reset_password',
  privacy_policy: '/privacy_policy',
  component: '/component',
  measure_skin: '/measure-skin',
  version: '/version',
  settings: '/settings',
  health_settings: '/health_settings',
  calendar: '/calendar',
  health: '/health',
  user: '/user',
  mark: '/mark',
  tutorial_binah: '/tutorial-binah',
  home: '/',
  profile: '/profile',
  side_menu: '/menu',
  vital_signs: '/vital_signs',
  processing: '/processing',
  recommand: '/recommand',
  results: '/results',
  skin: '/skin',
  tutorial_skinive: '/tutorial-skinive',
  measure_vitals: '/measure-vitals',
  wellness: '/wellness_score',
  change_language: '/change-language',
  desktop_screen: '/desktop-screen',
};

export enum UserTypes {
  ADMIN = 1,
  USER = 2,
}

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum HeightUnit {
  INCH = 'INCH',
  CM = 'CM',
}

export enum WeightUnit {
  KG = 'KG',
  LB = 'LB',
}

export enum SkinTypes {
  COMBINED = 'COMBINED',
  NORMAL = 'NORMAL',
  OILY = 'OILY',
  DRY = 'DRY',
}

export const skinTypes = [
  { label: 'combined', value: SkinTypes.COMBINED },
  { label: 'normal', value: SkinTypes.NORMAL },
  { label: 'oily', value: SkinTypes.OILY },
  { label: 'dry', value: SkinTypes.DRY },
];

export const weightRange = Array.from({ length: 191 }, (_, index) => 10 + index);

export const heightRange = Array.from({ length: 130 }, (_, index) => 100 + index);

export const yearRange = Array.from({ length: 80 }, (_, index) => new Date().getFullYear() - index);

export enum Integrations {
  SKINIVE = 1,
  BINNAH = 2,
}

export const LANGUAGE_CONVERT_OBJ = {
  RUSSIAN: 'ru',
  ENGLISH: 'en',
};
export const diseaseMapper: any = {
  Onychomycosis: 'onychomycosis',
  'Psoriasis Vulgaris': 'psoriasis_vulgaris',
  'Benign Nevus': 'benign_nevus',
  'Papillomatous Nevus': 'papillomatous_nevus',
  'Halo Nevus': 'halo_nevus',
  'Spitz Nevus': 'spitz_nevus',
  Hemangioma: 'hemangioma',
  Dermatofibroma: 'dermatofibroma',
  'Pyogenic Granuloma': 'pyogenic_granuloma',
  'Acral nevus': 'acral_nevus',
  'Dysplastic Nevus': 'dysplastic_nevus',
  'Blue Nevus': 'blue_nevus',
  Lentigo: 'lentigo',
  'Actinic Keratosis': 'actinic_keratosis',
  'Seborrheic Keratosis': 'seborrheic_keratosis',
  Keratoakantoma: 'keratoacanthoma',
  'Bowen Disease': 'Bowen_Disease',
  'Basal Cell Carcinoma': 'basal_cell_carcinoma',
  'Squamous Cell Carcinoma': 'squamous_cell',
  Melanoma: 'melanoma',
  'Lentigo-melanoma': 'lentigo_melanoma',
  'Skin Mycosis': 'skin_mycoses',
  Trichomycosis: 'trichomycosis',
  'Pityriasis versicolor': 'pityriasis_versicolor',
  'Psoriasis Pustular': 'pustular_psoriasis',
  'Lichen Planus': 'lichen_planus',
  'Seborrheic Dermatitis': 'seborrheic_dermatitis',
  'Linear Lichen': 'lichen_lichen',
  Papilloma: 'papilloma',
  'Wart Plane': 'plane_wart',
  'Wart Plantar': 'plantar_wart',
  'Molluscum Contagiosum': 'molluscum_contagiosum',
  'Herpes Simplex': 'herpes_simplex',
  'Herpes Genitalis': 'genital_herpes',
  'Herpes Zoster': 'herpes_zoster',
  'Varicella Zoster': 'chickenpox',
  'Acne Vulgaris': 'acne_vulgaris',
  'Acne Pustular': 'acne_pustular',
  'Acne Cystic': 'acne_cystic',
  'Comedone Closed': 'comedone_closed',
  'Comedone Open': 'comedone_open',
  Milium: 'milium_cyst',
  Rosacea: 'rosacea',
  Eczema: 'eczema',
  Dermatitis: 'dermatitis',
  'Atopic dermatitis': 'atopic_dermatitis',
  'dityriasis Rubra Pilaris Devergie': 'devergie_lichen',
  'Shining Versicolor': 'lichen_nitidus',
  'Pink Lichen': 'pityriasis_rosea',
  'Wart Vulgaris': 'common_wart',
  'Benign Lesions': 'benign_nevus',
  'Precancerous Conditions': 'dysplastic_nevus',
  Cancer: 'squamous_cell',
  'Fungal Infections': 'skin_mycoses',
  'Papulosquamous Disorders': 'pustular_psoriasis',
  'Viral Diseases': 'papilloma',
  'Herpesvirus Infections': 'herpes_simplex',
  Acne: 'acne_vulgaris',
};

export const russianDiseasesMapper: any = {
  Онихомикоз: 'onychomycosis',
  'Вульгарный псориаз': 'psoriasis_vulgaris',
  'Простой невус': 'benign_nevus',
  'Папилломатозный невус': 'papillomatous_nevus',
  Галоневус: 'halo_nevus',
  'Невус шпица': 'spitz_nevus',
  Гемангиома: 'hemangioma',
  Дерматофиброма: 'dermatofibroma',
  'Пиогенная гранулема': 'pyogenic_granuloma',
  'Акральный невус': 'acral_nevus',
  'Диспластический невус': 'dysplastic_nevus',
  'Голубой невус': 'blue_nevus',
  Лентиго: 'lentigo',
  'Актинический кератоз': 'actinic_keratosis',
  'Себорейный кератоз': 'seborrheic_keratosis',
  Кератоакантома: 'keratoacanthoma',
  'Болезнь Боуэна': 'Bowen_Disease',
  'Базальноклеточный рак кожи': 'basal_cell_carcinoma',
  'Плоскоклеточный рак кожи': 'squamous_cell',
  'Злокачественные новообразования': 'melanoma',
  'Лентиго-меланома': 'lentigo_melanoma',
  'Микоз кожи': 'skin_mycoses',
  Трихомикоз: 'trichomycosis',
  'Разноцветный лишай': 'pityriasis_versicolor',
  'Красный плоский лишай': 'lichen_planus',
  'Себорейный дерматит': 'seborrheic_dermatitis',
  'Линейный лишай': 'lichen_lichen',
  Папиллома: 'papilloma',
  'Бородавка плоская': 'plane_wart',
  'Бородавка подошвенная': 'plantar_wart',
  'Контагиозный моллюск': 'molluscum_contagiosum',
  'Простой герпес': 'herpes_simplex',
  'Генитальный герпес': 'genital_herpes',
  'Опоясывающий лишай': 'herpes_zoster',
  'Ветряная оспа': 'chickenpox',
  'Акне пустулезные': 'acne_pustular',
  'Акне кистозные': 'acne_cystic',
  'Комедон закрытый': 'comedone_closed',
  'Комедон открытый': 'comedone_open',
  Милиум: 'milium_cyst',
  Розацеа: 'rosacea',
  Экзема: 'eczema',
  Дерматит: 'dermatitis',
  'Атопический дерматит': 'atopic_dermatitis',
  'Красный волосяной лишай Девержи': 'devergie_lichen',
  'Блестящий лишай': 'lichen_nitidus',
  'Розовый лишай': 'pityriasis_rosea',
  'Бородавка обыкновенная': 'common_wart',
  'Плоскоклеточный рак': 'squamous_cell',
  'Микозы кожи': 'skin_mycoses',
  'Пустулезный псориаз': 'pustular_psoriasis',
  'Акне вульгарные': 'acne_vulgaris',
};

export const API_STATUS = {
  skinnive: 'skinnive',
  openai: 'openai',
};

export enum SmokingStatus {
  UNSPECIFIED = 0,
  SMOKER = 1,
  NON_SMOKER = 2,
}

export const smokingOptions = [
  { value: SmokingStatus.UNSPECIFIED.toString(), label: 'Unspecified' },
  { value: SmokingStatus.SMOKER.toString(), label: 'Smoker' },
  { value: SmokingStatus.NON_SMOKER.toString(), label: 'Non-Smoker' },
];
