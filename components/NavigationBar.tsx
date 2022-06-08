import Link from "next/link";
import Image from "next/image";

import LogoImageSrc from "@/public/images/logo.png";

import CartMenuIcon from "./icons/CartMenuIcon";
import MobileMenuIcon from "./icons/MobileMenuIcon";
import ProfileMenuIcon from "./icons/ProfileMenuIcon";

const NavigationBar: React.FC = () => (
  <header className="sticky top-0 left-0 z-50 flex flex-wrap items-center border-b border-gray-200 bg-white">
    <div
      className="grid w-full items-center justify-start py-5 px-4 lg:flex lg:justify-between lg:py-7 lg:px-14"
      style={{ gridTemplateColumns: "1fr auto 1fr" }}
    >
      <div className="inline-flex items-center lg:hidden">
        <MobileMenuIcon className="text-accent" />
      </div>

      <div className="flex items-center justify-center lg:justify-between">
        <Link href="/" passHref>
          <a className="inline-flex w-[188px] items-center justify-center">
            <Image
              src={LogoImageSrc}
              alt="Blooms Co."
              height={22}
              layout="fixed"
              className="inline-block object-contain"
            />
          </a>
        </Link>

        <nav className="hidden lg:inline-flex" />
      </div>

      <div className="flex items-center justify-end">
        <ProfileMenuIcon className="mr-4 text-accent" />
        <CartMenuIcon className="text-accent" />
      </div>
    </div>
  </header>
);

export default NavigationBar;
