import { NextPageWithLayout } from "./_app";
import MainBestItem from "@/components/pages/main/MainBestItem";
import MainEvent from "@/components/pages/main/MainEvent";
import MainLanking from "@/components/pages/main/MainLanking";
import Layout from "@/components/layouts/layout";
import MainSchedule from "@/components/pages/main/MainSchedule";
import { eventDataType } from "@/types/eventDataType";
import axios from "axios";
import React, { useState, useEffect } from "react";
const Home: NextPageWithLayout = () => {
  const [scheduledata, setScheduleData] = useState<eventDataType[]>();
  const BaseUrl = "43.200.189.164:8000";
  useEffect(() => {
    axios
      .get(`http://${BaseUrl}/sections-service/v1/schedules`)
      .then((res) => {
        setScheduleData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <MainBestItem />
      <MainEvent thumbnail={"/assets/images/dummy/bestItem01.png"} />
      {scheduledata &&
        scheduledata.map((item, index) => {
          return (
            <div key={item.id}>
              <MainSchedule id={item.id} name={item.name} />
            </div>
          );
        })}
      {/* <MainLanking /> */}
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
