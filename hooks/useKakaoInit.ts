import { useEffect } from "react";

const useKakaoInit = () => {

    useEffect(() => {
    const key = "ee5507aab5030c9c8efa803f59e62944";
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(key);
      console.log(window.Kakao.isInitialized());
    }
  }, []);
}
export default useKakaoInit