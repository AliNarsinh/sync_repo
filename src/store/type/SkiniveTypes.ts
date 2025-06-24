export enum SkiniveActionsType {
  SKINIVE_PREDICT = 'SKINIVE_PREDICT',
  SKINIVE_DETAIL = 'SKINIVE_DETAIL',
}
export interface SkiniveResponse {
  atlas_page_link: string;
  check_cx: number;
  check_cy: number;
  check_cz: number;
  check_datetime: string;
  check_id: number;
  class: string;
  class_raw: string;
  colored_s3_url: string;
  description: string;
  desease: string;
  error: null | any;
  high_risk_prob: number;
  image_url: string;
  is_result_confident: boolean;
  lesion_code: string;
  masked_s3_url: string;
  patient_id: null | any;
  prob: string;
  quality_good: boolean;
  risk: string;
  risk_level: string;
  s3_name: string;
  s3_url: string;
  short_recommendation: string;
  status: boolean;
  topn?: TopnItem[];
  uid: string;
}

export interface TopnItem {
  atlas_page_link: string;
  class: string;
  class_raw: string;
  description: string;
  desease: string;
  prob: number;
  risk: string;
  risk_level: string;
}
