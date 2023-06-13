import getConfigs from "./config.common";

// backend 서버 URL
const baseUrl = "https://api.readme.life";
const mode = "dev";
const loginRedirectUri = "https://readme.life/kakao"

const configDev = getConfigs({
  baseUrl,
  mode,
  loginRedirectUri,
});

export default configDev;