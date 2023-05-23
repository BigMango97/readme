import PointMiddle from "@/components/pages/point/PointMiddle";
import PointTop from "@/components/pages/point/PointTop";
import PointBottom from "@/components/pages/point/PointBottom";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function PointCharge() {
  const [cookies] = useCookies(["accessToken"]);
  const router = useRouter();
  useEffect(() => {
    if (!cookies.accessToken) {
      Swal.fire({
        title: "로그인 후 이용가능한 서비스 입니다.",
        text: "로그인 페이지로 이동",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6E48EB",
        cancelButtonColor: "#7F8088",
        confirmButtonText: "이동",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  }, []);

  return (
    <>
      <PointTop />
      <PointMiddle />
      <PointBottom />
    </>
  );
}
