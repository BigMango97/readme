import React from "react";
import style from "@/components/pages/search/RecentSearchTop.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { recentSearchWord } from "@/state/recentSearchWord";
export default function RecentSearchTop() {
  const [searchValue, setSearchValue] = useRecoilState(recentSearchWord);
  const handleClearKeywords = () => {
    Swal.fire({
      icon: "info",
      text: "최근 검색어를 모두 삭제하시겠습니까?",
      cancelButtonText: "취소",
      showCancelButton: true,
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setSearchValue([]);
      }
    });
  };
  return (
    <div className={style.recentSearchTopWrap}>
      <div className={style.recentSearchTopTitle}>최근 검색어</div>
      <div
        className={style.recentSearchTopDelete}
        onClick={handleClearKeywords}
      >
        <p>전체삭제</p>
        <Image
          src="/assets/images/icons/delete.svg"
          alt="trashIcon"
          width={14}
          height={14}
        />
      </div>
    </div>
  );
}
