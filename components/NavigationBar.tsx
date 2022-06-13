import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cx from "classnames";

import LogoImageSrc from "@/public/images/logo.png";

import CartMenuIcon from "./icons/CartMenuIcon";
import MobileMenuIcon from "./icons/MobileMenuIcon";
import ProfileMenuIcon from "./icons/ProfileMenuIcon";

const NavigationBar: React.FC = () => {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Best-sellers", href: "/products" },
    { name: "Houseplants", href: "/category/houseplants" },
  ];

  return (
    <header className="sticky top-0 left-0 z-[1] flex flex-wrap items-center border-b border-gray-200 bg-white">
      <div
        className="grid w-full items-center justify-start py-5 px-4 lg:flex lg:justify-between lg:py-7 lg:px-14"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <button
          type="button"
          className="inline-flex items-center lg:hidden"
          onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}
        >
          <MobileMenuIcon className="text-accent" />
        </button>

        <div className="flex items-center justify-center lg:justify-between">
          <Link href="/" passHref>
            <a className="inline-flex w-[188px] items-center justify-center">
              <Image
                src={LogoImageSrc}
                alt="Blooms Co."
                height={22}
                layout="fixed"
                className="inline-block select-none object-contain"
              />
            </a>
          </Link>

          {/* Desktop menu links. */}
          <nav className="ml-12 hidden flex-col lg:inline-flex">
            <ul className="flex items-baseline space-x-4">
              {links.map((link) => (
                <li key={`desktop-${link.name}`}>
                  <Link href={link.href}>
                    <a className="block font-display text-base font-medium text-accent">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center justify-end">
          <ProfileMenuIcon className="mr-4 text-accent" />
          <CartMenuIcon className="snipcart-checkout cursor-pointer text-accent" />
        </div>
      </div>

      {/* Mobile menu links. */}
      <div
        className={cx(
          "w-full py-4 px-4",
          isMobileMenuOpened ? "block lg:hidden" : "hidden"
        )}
      >
        <ul className="flex flex-col space-y-2">
          {links.map((link) => (
            <li
              key={`mobile-${link.name}`}
              className="border-b border-gray-200"
            >
              <Link href={link.href}>
                <a className="block py-2 text-base text-accent">{link.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationBar;
