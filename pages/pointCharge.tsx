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
      //router.push("/login");
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
