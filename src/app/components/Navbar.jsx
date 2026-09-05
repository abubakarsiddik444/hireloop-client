"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data:session, isPending } = useSession(); 
  console.log("Session data in Navbar:", session, "Is Pending:", isPending);
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#171719]/95 text-white backdrop-blur-xl"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(255,255,255,0.035) 1px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            rgba(255,255,255,0.025) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "82px 72px",
      }}
    >
      {/* Main Navbar */}
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center"
        >
          <span className="text-3xl font-bold tracking-[-1.5px]">
            <span className="text-[#1683e8] transition group-hover:text-[#3b9cf0]">
              hire
            </span>

            <span className="text-[#ff6b00] transition group-hover:text-[#ff812b]">
              loop
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center md:flex">

          {/* Navigation Links */}
          <div className="flex items-center gap-8">

            {/* Browse Jobs */}
            <Link
              href="/jobs"
              className="text-sm font-normal text-gray-300 transition duration-200 hover:text-white"
            >
              Browse Jobs
            </Link>

            {/* Company */}
            <Link
              href="/companies"
              className="text-sm font-normal text-gray-300 transition duration-200 hover:text-white"
            >
              Company
            </Link>

            {/* Pricing */}
            <Link
              href="/pricing"
              className="text-sm font-normal text-gray-300 transition duration-200 hover:text-white"
            >
              Pricing
            </Link>

          </div>

          {/* Divider */}
          <div className="mx-6 h-5 w-px bg-white/20" />

          {/* Sign In */}
          {
            user ?
            <>
            Hi, {user.name}!
            <Button onClick={handleSignOut} variant="ghost">
              SignOut
            </Button>
            </>
            :
            <Link
            href="/auth/signin"
            className="mr-7 text-sm font-medium text-[#a78bfa] transition duration-200 hover:text-[#c4b5fd]"
          >
            Sign In
          </Link>}

          {/* Get Started */}
          <Link
            href="/auth/signup"
            className="rounded-lg bg-gradient-to-r from-[#7956f5] to-[#6854ee] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition duration-200 hover:scale-[1.02] hover:from-[#8868ff] hover:to-[#7564fa] hover:shadow-purple-500/30"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-200 transition duration-200 hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            /* Close Icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* Menu Icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#171719]/98 backdrop-blur-xl md:hidden">

          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">

            <div className="flex flex-col">

              {/* Browse Jobs */}
              <Link
                href="/jobs"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition duration-200 hover:bg-white/5 hover:text-white"
              >
                Browse Jobs
              </Link>

              {/* Company */}
              <Link
                href="/companies"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition duration-200 hover:bg-white/5 hover:text-white"
              >
                Company
              </Link>

              {/* Pricing */}
              <Link
                href="/pricing"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition duration-200 hover:bg-white/5 hover:text-white"
              >
                Pricing
              </Link>

              {/* Divider */}
              <div className="my-3 h-px bg-white/10" />

              {/* Sign In */}
              <Link
                href="/auth/signin"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-[#a78bfa] transition duration-200 hover:bg-white/5 hover:text-[#c4b5fd]"
              >
                Sign In
              </Link>

              {/* Get Started */}
              <Link
                href="/auth/signup"
                onClick={closeMenu}
                className="mt-2 rounded-lg bg-gradient-to-r from-[#7956f5] to-[#6854ee] px-4 py-3 text-center text-sm font-medium text-white transition duration-200 hover:opacity-90"
              >
                Get Started
              </Link>

            </div>

          </div>

        </div>
      )}
    </nav>
  );
}




// i am developing a hiring website. where job seekers can apply for jobs and there will be recruiter and admin, there will all other related pagees and dashboard. right now i need a navigation bar. give me a navbar 

// i am using 
// nextjs 
/***
 * heroui
 * tailwindcss
 * 
 * give me the navbar component code. 
 * it will be mobile responsive  navbar. will have a logo as well and necessary links
 * 
 * a am using hero v3
 * 
 * code
 * 
 * do not use hero ui component. use html5 tags. if needed look at this at this code below to get inspriation:
 */

