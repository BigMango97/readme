import React, { useEffect, useState } from "react";
import NovelDatailHeader from "@/components/pages/noveldetail/NovelDatailHeader";
import NovelDetailInfo from "@/components/pages/noveldetail/NovelDetailInfo";
import NovelDetailMenu from "@/components/pages/noveldetail/NovelDetailMenu";
import DetailFooter from "@/components/layouts/DetailFooter";
import { useRouter } from "next/router";
import axios from "axios";
import { specificnovelSearchType } from "@/types/model/detailPageDataTypes";
import { title } from "process";

export default function Novel() {
  const [data, setData] = useState<specificnovelSearchType>();
  const { query } = useRouter();

  useEffect(() => {
    axios
      // .get(`http://localhost:3001/specificnovelSearch/${query.novelId}`)
      .get(`http://localhost:3001/specificnovelSearch`)
      .then((res) => {
        setData(res.data[0]);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <NovelDatailHeader />
      {data && (
        <NovelDetailInfo
          title={data.title}
          description={data.description}
          serializationStatus={data.serializationStatus}
          genre={data.genre}
          thumbnail={data.thumbnail}
          views={data.views}
          starRating={data.starRating}
        />
      )}
      {data && <NovelDetailMenu tag={data.tag} thumbnail={data.thumbnail} />}
      <DetailFooter />
    </>
  );
}
