export const footerMenu = [
  {
    id: 1,
    title: "home",
    link: "/",
    iconUrl: "/assets/images/icons/home.svg",
  },
  {
    id: 2,
    title: "novels",
    link: "/novel?category=%EC%9A%94%EC%9D%BC&subCategory=%EC%9B%94&viewerType=card",
    iconUrl: "/assets/images/icons/book.svg",
  },
  {
    id: 3,
    title: "search",
    link: "/search",
    iconUrl: "/assets/images/icons/search.svg",
  },
  {
    id: 4,
    title: "mybooks",
    link: "/library?id=1",
    iconUrl: "/assets/images/icons/library.svg",
  },
  {
    id: 5,
    title: "mypage",
    link: "/mypage",
    iconUrl: "/assets/images/icons/user.svg",
  },
];

export const viewerBottomMenu = [
  {
    id: 1,
    title: "reviewRating",
    iconUrl: "/assets/images/icons/star.svg",
    width:20,
    height:20,
    alt:"starIcon"
  },
  {
    id: 2,
    title: "comment",
    iconUrl: "/assets/images/icons/commentIcon.svg",
    width:25,
    height:25,
    alt:"commentIcon"
  },
  {
    id: 3,
    title: "beforenovel",
    iconUrl: "/assets/images/icons/chevron-left.svg",
    width:25,
    height:25,
    alt:"leftIcon"
  },
  {
    id: 4,
    title: "nextnovel",
    iconUrl: "/assets/images/icons/chevron-right.svg",
    width:25,
    height:25,
    alt:"rightIcon"
  },
];

export const subDayMenu = [
  { id: 1, title: "월" },
  { id: 2, title: "화" },
  { id: 3, title: "수" },
  { id: 4, title: "목" },
  { id: 5, title: "금" },
  { id: 6, title: "토" },
  { id: 7, title: "일" },
];

export const subStatusMenu = [
  { id: 1, title: "신작" },
  { id: 2, title: "연재중" },
  { id: 3, title: "완결" },
];

export const mypageMenu = [
  { id: 1, title: "포인트 충전 목록" },
  { id: 2, title: "이용약관" }
]

export const mybookMenu = [
  { id: 1, title: "최근 본 소설" },
  { id: 2, title: "좋아요" },
  { id: 3, title: "구매완료" }
]