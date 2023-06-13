import getConfigs from "./config.common";

// backend 서버 URL
const baseUrl = "http://43.200.189.164:8000";
const mode = "devlocal";
const loginRedirectUri = "http://localhost:3000/kakao"

const configDev = getConfigs({
  baseUrl,
  mode,
  loginRedirectUri
});

export default configDev;