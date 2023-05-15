import getConfigs from "./config.common";

// backend 서버 URL
const baseUrl = "http://43.200.189.164:8000";

//const baseUrl = "http://localhost:8080";
//const baseUrl = "http://43.200.180.136:8080";
//const baseUrl = "http://10.10.10.76:8081";

const mode = "dev";

const configDev = getConfigs({
  baseUrl,
  mode,
});

export default configDev;