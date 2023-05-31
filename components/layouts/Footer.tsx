import React from "react";
import { footerMenu } from "@/datas/staticData";
import { footerMenuType } from "@/types/static/staticDataType";
import Image from "next/image";
import style from "@/components/layouts/Footer.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCookies } from "react-cookie";
export default function Footer() {
  return (
    <footer className={style.mainFooter}>
      <nav>
        <ul>
          {footerMenu.map((item: footerMenuType) => (
            <FooterMenuItem item={item} key={item.id} />
          ))}
        </ul>
      </nav>
    </footer>
  );
}

const FooterMenuItem = (props: { item: footerMenuType }) => {
  const router = useRouter();
  //const [cookies, setCookie] = useCookies(["accessToken", "uuid"]);

  const linkHandler = (link: string) => {
    sessionStorage.setItem("link", link);
  };

  return (
    <li
      key={props.item.id}
      className={
        router.route !== props.item.link.split("?")[0] ? style.active : ""
      }
    >
      <Link href={props.item.link}>
        <Image
          src={props.item.iconUrl}
          alt={props.item.title}
          width={72}
          height={72}
          priority
          onClick={() => linkHandler(props.item.link)}
        />
      </Link>
    </li>
  );
};
