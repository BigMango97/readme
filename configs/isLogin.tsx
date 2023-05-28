import { useCookies } from "react-cookie";

const isLogin = () => {
  const [cookies] = useCookies(["accessToken"]);

  if (cookies.accessToken) {
    return true;
  } else return false;
};

export default isLogin;
