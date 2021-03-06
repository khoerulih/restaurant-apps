import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}list`,
  IMAGE_MEDIUM: `${CONFIG.BASE_URL}images/medium/`,
  IMAGE_SMALL: `${CONFIG.BASE_URL}images/small/`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  INSERT_REVIEW: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
