"use client";

import { useEffect, useRef, useState } from "react";
import { Input, Select, Label, ListBox } from "@heroui/react";
import { useRouter } from "next/navigation";
import JobListingContainer from "./JobListingContainer";

// Number of jobs shown per page
const PER_PAGE = 10;

// Convert React Aria selection key to string
const toValue = (key) =>
  key === null || key === undefined ? "all" : String(key);

// Build the list of page numbers with ellipsis, e.g. 1 ... 4 5 6 ... 10
const getPageNumbers = (current, total) => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [1];

  if (current > 3) pages.push("start-ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("end-ellipsis");

  pages.push(total);

  return pages;
};

export default function JobFilters({
  jobs = [],
  categories: categoriesProp,
  types: typesProp,
  filters = {},
}) {
  const router = useRouter();

  // Initialize state from URL query parameters
  const [search, setSearch] = useState(filters.search || "");
  const [category, setCategory] = useState(filters.category || "all");
  const [type, setType] = useState(filters.type || "all");
  const [location, setLocation] = useState(
    filters.remote === "true"
      ? "remote"
      : filters.remote === "false"
        ? "onsite"
        : "all"
  );

  // Current page (client side)
  const [page, setPage] = useState(1);

  // Skip the URL update on the first render
  const isFirstRender = useRef(true);

  // Update the URL when any filter changes.
  // router.replace re-runs the server page, so fresh data is fetched
  // from the API without a manual reload.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Small debounce so typing in search doesn't fire a request per keystroke
    const timer = setTimeout(() => {
      const sp = new URLSearchParams();

      if (search.trim()) sp.set("search", search.trim());
      if (category !== "all") sp.set("category", category);
      if (type !== "all") sp.set("type", type);

      if (location === "remote") sp.set("remote", "true");
      else if (location === "onsite") sp.set("remote", "false");

      const query = sp.toString();
      router.replace(query ? `/jobs?${query}` : "/jobs", { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category, type, location, router]);

  // Each handler updates its filter and resets to page 1
  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (key) => {
    setCategory(toValue(key));
    setPage(1);
  };

  const handleType = (key) => {
    setType(toValue(key));
    setPage(1);
  };

  const handleLocation = (key) => {
    setLocation(toValue(key));
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setType("all");
    setLocation("all");
    setPage(1);
  };

  const safeJobs = Array.isArray(jobs) ? jobs : [];

  // Use options from the page if provided, otherwise build them from jobs
  const categories =
    categoriesProp ||
    [...new Set(safeJobs.map((job) => job.category).filter(Boolean))];

  const types =
    typesProp ||
    [...new Set(safeJobs.map((job) => job.type).filter(Boolean))];

  // Filter jobs (safe even if the server already filtered them)
  const filteredJobs = safeJobs.filter((job) => {
    const text = (search || "").toLowerCase().trim();

    const title = (job.title || "").toLowerCase();
    const company = (job.companyName || "").toLowerCase();
    const jobLocation = (job.location || "").toLowerCase();

    const searchMatch =
      !text ||
      title.includes(text) ||
      company.includes(text) ||
      jobLocation.includes(text);

    const categoryMatch = category === "all" || job.category === category;

    const typeMatch = type === "all" || job.type === type;

    const locationMatch =
      location === "all" ||
      (location === "remote" && job.remote === true) ||
      (location === "onsite" && job.remote === false);

    return searchMatch && categoryMatch && typeMatch && locationMatch;
  });

  // Pagination values (10 jobs per page)
  const total = filteredJobs.length;
  const totalPages = Math.max(Math.ceil(total / PER_PAGE), 1);

  // Keep the page inside a valid range if the job count shrinks
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + PER_PAGE);

  // Range shown in the summary, e.g. "Showing 11-20 of 34 open positions"
  const from = total === 0 ? 0 : startIndex + 1;
  const to = Math.min(startIndex + PER_PAGE, total);

  // Go to a specific page
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 rounded-2xl border border-white/10 bg-[#111] p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="min-w-0 lg:col-span-2">
            <Label className="mb-2 block text-sm text-white">Search Jobs</Label>

            <Input
              className="w-full"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search title, company or location"
            />
          </div>

          {/* Category */}
          <Select selectedKey={category} onSelectionChange={handleCategory}>
            <Label>Category</Label>

            <Select.Trigger>
              <Select.Value placeholder="All categories" />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="all" textValue="All categories">
                  <Label>All categories</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                {categories.map((item) => (
                  <ListBox.Item key={item} id={item} textValue={item}>
                    <Label className="capitalize">{item}</Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Job Type */}
          <Select selectedKey={type} onSelectionChange={handleType}>
            <Label>Job Type</Label>

            <Select.Trigger>
              <Select.Value placeholder="All types" />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="all" textValue="All types">
                  <Label>All types</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                {types.map((item) => (
                  <ListBox.Item key={item} id={item} textValue={item}>
                    <Label className="capitalize">{item}</Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Work Location */}
        <div className="mt-4 max-w-[250px]">
          <Select selectedKey={location} onSelectionChange={handleLocation}>
            <Label>Work Location</Label>

            <Select.Trigger>
              <Select.Value placeholder="All locations" />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="all" textValue="All locations">
                  <Label>All locations</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="remote" textValue="Remote">
                  <Label>Remote</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="onsite" textValue="On-site">
                  <Label>On-site</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Total open positions (top) and Clear */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-white/40">{total} open positions</p>

          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-white/50 hover:text-white"
          >
            Clear filters
          </button>
        </div>
      </div>

      <JobListingContainer jobs={paginatedJobs} />

      {/* Bottom summary and pagination */}
      {total > 0 && (
        <div className="mt-8 flex flex-col items-center gap-3">
          {/* Shows the current range and the total again */}
          <p className="text-sm text-white/40">
            Showing {from}-{to} of {total} open positions
          </p>

          {/* Page buttons (hidden when there is only one page) */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {getPageNumbers(currentPage, totalPages).map((p) =>
                typeof p === "string" ? (
                  <span key={p} className="px-2 text-white/40">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      p === currentPage
                        ? "bg-white text-black"
                        : "border border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}