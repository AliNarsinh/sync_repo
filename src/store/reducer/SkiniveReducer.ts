import { SkiniveActionsType, ActionParams, SkiniveResponse } from '@app/store/type';

// Define the initial state based on the SkiniveResponse interface
const initialState: SkiniveResponse = {
  atlas_page_link: '',
  check_cx: 0,
  check_cy: 0,
  check_cz: 0,
  check_datetime: '',
  check_id: 0,
  class: '',
  class_raw: '',
  colored_s3_url: '',
  description: '',
  desease: '',
  error: null,
  high_risk_prob: 0,
  image_url: '',
  is_result_confident: false,
  lesion_code: '',
  masked_s3_url: '',
  patient_id: null,
  prob: '',
  quality_good: false,
  risk: '',
  risk_level: '',
  s3_name: '',
  s3_url: '',
  short_recommendation: '',
  status: false,
  topn: [],
  uid: '',
};

// eslint-disable-next-line
export default (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case SkiniveActionsType.SKINIVE_PREDICT:
      return {
        ...state,
        atlas_page_link: action.payload?.atlas_page_link,
        check_cx: action.payload?.check_cx,
        check_cy: action.payload?.check_cy,
        check_cz: action.payload?.check_cz,
        check_datetime: action.payload?.check_datetime,
        check_id: action.payload?.check_id,
        class: action.payload?.class,
        class_raw: action.payload?.class_raw,
        colored_s3_url: action.payload?.colored_s3_url,
        description: action.payload?.description,
        desease: action.payload?.desease,
        error: action.payload?.error,
        high_risk_prob: action.payload?.high_risk_prob,
        image_url: action.payload?.image_url,
        is_result_confident: action.payload?.is_result_confident,
        lesion_code: action.payload?.lesion_code,
        masked_s3_url: action.payload?.masked_s3_url,
        patient_id: action.payload?.patient_id,
        prob: action.payload?.prob,
        quality_good: action.payload?.quality_good,
        risk: action.payload?.risk,
        risk_level: action.payload?.risk_level,
        s3_name: action.payload?.s3_name,
        s3_url: action.payload?.s3_url,
        short_recommendation: action.payload?.short_recommendation,
        status: action.payload?.status,
        topn: action.payload?.topn,
        uid: action.payload?.uid,
      };
    default:
      return state;
  }
};
