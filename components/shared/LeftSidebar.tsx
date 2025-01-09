"use client";

import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignOutButton, useUser } from "@clerk/nextjs";

function LeftSidebar() {
  const pathname = usePathname();
  const { user } = useUser(); // Retrieve the logged-in user's details

  // Dynamically update links with the user ID
  const linksWithProfile = sidebarLinks.map((link) => {
    if (link.route === "/profile" && user?.id) {
      return {
        ...link,
        route: `/profile/${user.id}`, // Add user ID to the route dynamically
      };
    }
    return link;
  });

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {linksWithProfile.map((link) => {
          // Skip rendering the "Profile" link if the user ID is not available
          if (link.route.includes("/profile/") && !user?.id) return null;

          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton redirectUrl="/sign-in">
            <div className="flex cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden gap-4 p-4">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
