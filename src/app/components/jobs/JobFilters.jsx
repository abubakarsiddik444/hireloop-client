
"use client";

import { useEffect, useState } from "react";
import {
  Input,
  Select,
  Label,
  ListBox,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import JobListingContainer from "./JobListingContainer";

export default function JobFilters({ jobs = [], filters = {} }) {
  const router = useRouter();

  // Initialize state from URL query parameters
  const [search, setSearch] = useState(filters.search || "");
  const [category, setCategory] = useState(filters.category || "");
  const [type, setType] = useState(filters.type || "");
  const [location, setLocation] = useState(
    filters.remote === "true"
      ? "remote"
      : filters.remote === "false"
        ? "onsite"
        : ""
  );

  // Update URL when filters change
  useEffect(() => {
    const sp = new URLSearchParams();

    if (search.trim()) {
      sp.set("search", search.trim());
    }

    if (category && category !== "all") {
      sp.set("category", category);
    }

    if (type && type !== "all") {
      sp.set("type", type);
    }

    if (location === "remote") {
      sp.set("remote", "true");
    } else if (location === "onsite") {
      sp.set("remote", "false");
    }

    const query = sp.toString();
    const path = query ? `/jobs?${query}` : "/jobs";

    router.replace(path, { scroll: false });
  }, [search, category, type, location, router]);

  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const categories = [
    ...new Set(
      safeJobs.map((job) => job.category).filter(Boolean)
    ),
  ];

  const types = [
    ...new Set(
      safeJobs.map((job) => job.type).filter(Boolean)
    ),
  ];

  // Filter jobs
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

    const categoryMatch =
      !category || job.category === category;

    const typeMatch =
      !type || job.type === type;

    const locationMatch =
      !location ||
      (location === "remote" && job.remote === true) ||
      (location === "onsite" && job.remote === false);

    return (
      searchMatch &&
      categoryMatch &&
      typeMatch &&
      locationMatch
    );
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setType("");
    setLocation("");
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 rounded-2xl border border-white/10 bg-[#111] p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="min-w-0 lg:col-span-2">
            <Label className="mb-2 block text-sm text-white">
              Search Jobs
            </Label>

            <Input
              className="w-full"
              value={search}
              onChange={(value) =>
                setSearch(
                  typeof value === "string"
                    ? value
                    : value?.target?.value || ""
                )
              }
              placeholder="Search title, company or location"
            />
          </div>

          {/* Category */}
          <Select
            value={category || null}
            onChange={(value) =>
              setCategory(value ? String(value) : "")
            }
          >
            <Label>Category</Label>

            <Select.Trigger>
              <Select.Value placeholder="All categories" />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {categories.map((item) => (
                  <ListBox.Item
                    key={item}
                    id={item}
                    textValue={item}
                  >
                    <Label className="capitalize">
                      {item}
                    </Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Job Type */}
          <Select
            value={type || null}
            onChange={(value) =>
              setType(value ? String(value) : "")
            }
          >
            <Label>Job Type</Label>

            <Select.Trigger>
              <Select.Value placeholder="All types" />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {types.map((item) => (
                  <ListBox.Item
                    key={item}
                    id={item}
                    textValue={item}
                  >
                    <Label className="capitalize">
                      {item}
                    </Label>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Work Location */}
        <div className="mt-4 max-w-[250px]">
          <Select
            value={location || null}
            onChange={(value) =>
              setLocation(value ? String(value) : "")
            }
          >
            <Label>Work Location</Label>

            <Select.Trigger>
              <Select.Value placeholder="All locations" />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item
                  id="remote"
                  textValue="Remote"
                >
                  <Label>Remote</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item
                  id="onsite"
                  textValue="On-site"
                >
                  <Label>On-site</Label>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Results and Clear */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-white/40">
            {filteredJobs.length} open positions
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-white/50 hover:text-white"
          >
            Clear filters
          </button>
        </div>
      </div>

      <JobListingContainer jobs={filteredJobs} />
    </div>
  );
}