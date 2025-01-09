"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";
import { useUser } from "@clerk/nextjs";

function Bottombar() {
  const pathname = usePathname();
  const { user } = useUser(); // Retrieve the logged-in user's details

  // Generate dynamic profile link
  const linksWithProfile = sidebarLinks.map((link) => {
    if (link.route === "/profile") {
      return {
        ...link,
        route: `/profile/${user?.id}`, // Use the user's ID dynamically
      };
    }
    return link;
  });

  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {linksWithProfile.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className='object-contain'
              />

              <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;