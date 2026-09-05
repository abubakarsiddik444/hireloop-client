"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-[#09090b] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-3xl font-bold tracking-[-1.5px]"
            >
              <span className="text-[#1683e8]">
                hire
              </span>

              <span className="text-[#ff6b00]">
                loop
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
              The AI-native career platform. Built for people
              who take their work seriously.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-3">

              {/* Facebook */}
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-gray-500 transition hover:bg-[#1877F2]/20 hover:text-[#1877F2]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.55.45-1 1-1Z" />
                </svg>
              </Link>

              {/* Pinterest */}
              <Link
                href="#"
                aria-label="Pinterest"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#6551c9]/20 text-[#8b7be8] transition hover:bg-[#6551c9]/30 hover:text-[#a99cff]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 2C6.48 2 2 6.03 2 11.33c0 3.77 2.13 7.07 5.31 8.68-.07-.74-.01-1.64.18-2.49l1.17-4.96s-.3-.6-.3-1.49c0-1.4.81-2.45 1.82-2.45.86 0 1.28.65 1.28 1.43 0 .87-.55 2.17-.83 3.38-.24 1.01.51 1.84 1.51 1.84 1.81 0 3.2-1.91 3.2-4.67 0-2.44-1.75-4.15-4.25-4.15-2.9 0-4.6 2.18-4.6 4.43 0 .88.34 1.82.76 2.33.08.1.09.18.07.29l-.28 1.13c-.05.18-.15.22-.35.13-1.3-.6-2.11-2.48-2.11-3.99 0-3.25 2.36-6.23 6.81-6.23 3.57 0 6.35 2.55 6.35 5.96 0 3.55-2.24 6.41-5.35 6.41-1.04 0-2.02-.54-2.36-1.18l-.64 2.44c-.23.89-.85 2-1.27 2.68.96.29 1.98.45 3.04.45 5.52 0 10-4.03 10-9.33C22 6.03 17.52 2 12 2Z" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-gray-500 transition hover:bg-[#0A66C2]/20 hover:text-[#0A66C2]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M6.5 8.5A2.5 2.5 0 1 0 6.5 3a2.5 2.5 0 0 0 0 5.5ZM4 10h5v11H4V10Zm8 0h4.8v1.5h.07c.67-1.2 2.3-2.5 4.73-2.5 5.06 0 5.4 3.33 5.4 7.67V21h-5v-3.85c0-.92-.02-2.1-1.28-2.1-1.28 0-1.48 1-1.48 2.03V21h-5V10Z" />
                </svg>
              </Link>

            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-medium text-[#8b5cf6]">
              Product
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-gray-500 transition hover:text-gray-200"
                >
                  Job discovery
                </Link>
              </li>

              <li>
                <Link
                  href="/worker-ai"
                  className="text-sm text-gray-500 transition hover:text-gray-200"
                >
                  Worker AI
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="text-sm text-gray-500 transition hover:text-gray-200"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/salary-data"
                  className="text-sm text-gray-500 transition hover:text-gray-200"
                >
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigations */}
          <div>
            <h3 className="text-sm font-medium text-[#8b5cf6]">
              Navigations
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-gray-500 transition hover:text-gray-200"
                >
                  Help center
                </Link>
              </li>

              <li>
                <Link
                  href="/career-library"
                  className="text-sm text-gray-500 transition hover:text-gray-200"
                >
                  Career library
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-500 transition hover:text-gray-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-medium text-[#8b5cf6]">
              Resources
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/brand-guideline"
                  className="text-sm text-gray-500 transition hover:text-gray-200"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="/newsroom"
                  className="text-sm text-gray-500 transition hover:text-gray-200"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-white/10 pt-6">

          <div className="flex flex-col gap-4 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-end sm:gap-8">

            <p>
              Copyright 2024 — Programming Hero
            </p>

            <Link
              href="/terms"
              className="transition hover:text-gray-400"
            >
              Terms & Policy
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-gray-400"
            >
              Privacy Guideline
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}


// now give me footer for this website using the attached image.
// i am using @gravity-ui/icons and it is already installed