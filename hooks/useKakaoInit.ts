import { useEffect } from "react";

const useKakaoInit = () => {

    useEffect(() => {
   
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      
    }
  }, []);

}
export default useKakaoInit