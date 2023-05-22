import getConfigs from "./config.common";

// backend 서버 URL
const baseUrl = "http://43.200.189.164:8000";
const mode = "devlocal";

const configDev = getConfigs({
  baseUrl,
  mode,
});

export default configDev;