"use client";

import { useAppSelector } from "@/store/hooks";
import { FaTiktok } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { MdFacebook } from "react-icons/md";
import Container from "../Container";
import Link from "next/link";
import Image from "next/image";
import getImages from "@/lib/getImages";

function Footer() {
  const theme = useAppSelector((state) => state.theme);
  const logoUrl = getImages(theme?.theme?.Logo, false);

  return (
    <div id="Footer" className="bg-linear-to-b from-background to-accent mt-10">
      <Container className="rounded-lg !px-10 pb-5">
        <div className="flex justify-center p-4">
          <div className="flex items-center w-full max-w-4xl"></div>
        </div>

        {/* Menus */}
        <div className=" grid-cols-6 max-md:grid-cols-2 max-sm:grid-cols-1 gap-y-6 text-sm capitalize max-sm:text-center mt-10 md:grid hidden">
          <div className="m-auto col-span-2">
            <Link href="/" className="mr-auto block mb-5">
              {logoUrl && (
                <div className="relative w-[120px] h-[40px]">
                  <Image
                    src={logoUrl}
                    alt="Logo"
                    fill
                    priority
                    sizes="(max-width: 768px) 100px, 120px"
                    className="object-contain"
                  />
                </div>
              )}
            </Link>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Tortor
              fringilla erat vulputate. Sem egestas suscipit tempus. Ad natoque
              viverra aenean lacus. Justo eu integer nisl.
            </p>
          </div>

          {[
            theme?.Menu?.aboutMenu,
            theme?.Menu?.mainMenu,
            theme?.Menu?.termsAndConditions,
            theme?.Menu?.contactUs,
          ].map(
            (menu, index) =>
              menu && (
                <div className="col-span-1" key={index}>
                  <h1 className="font-semibold mb-2">{menu.Title}</h1>
                  <ul className="space-y-1">
                    {menu.listLinks?.map((el, k) => {
                      const isInternal =
                        !el.ExternalLink &&
                        theme.Pages?.find((item) => item.slug === el.Link);
                      const href = "/" + el.Link.replace(/\s+/g, "-");

                      return (
                        <li key={k}>
                          <Link
                            href={href}
                            target={el.ExternalLink ? "_blank" : undefined}
                            className="hover:text-primary hover:underline"
                          >
                            {el.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {index === 3 && (
                    <div className="md:w-full w-fit m-auto">
                      <div className="flex gap-4 mt-5 text-2xl text-gray-600">
                        <a
                          href={
                            theme?.theme?.generalSetting?.facebookUrl ||
                            "https://www.facebook.com/"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                                  aria-label="Go to Facebook"
                        >
                          <MdFacebook />
                        </a>
                        <a
                          href={
                            theme?.theme?.generalSetting?.Instagram_url ||
                            "https://www.instagram.com/"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                           aria-label="Go to Instagram"
                        >
                          <RiInstagramFill />
                        </a>
                        <a
                          href={
                            theme?.theme?.generalSetting?.TiktokUrl ||
                            "https://www.tiktok.com/"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                            aria-label="Go to Tiktok"
                        >
                          <FaTiktok />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
          )}
        </div>

        <div className="md:hidden flex">
          <div className="md:w-full w-fit m-auto">
            <div className="flex gap-4 mt-5 text-2xl text-gray-600">
              <a
                href={
                  theme?.theme?.generalSetting?.facebookUrl ||
                  "https://www.facebook.com/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="Go to Facebook"
              >
                <MdFacebook />
              </a>
              <a
                href={
                  theme?.theme?.generalSetting?.Instagram_url ||
                  "https://www.instagram.com/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="Go to Instagram"
              >
                <RiInstagramFill />
              </a>
              <a
                href={
                  theme?.theme?.generalSetting?.TiktokUrl ||
                  "https://www.tiktok.com/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="Go to Tiktok"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-sm text-center p-2 mt-8 text-gray-500">
          © {new Date().getFullYear()}. All rights reserved by{" "}
          <a
            href="https://risecart.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary font-medium"
          >
            Risecart
          </a>
          .
        </div>
      </Container>
    </div>
  );
}

export default Footer;
