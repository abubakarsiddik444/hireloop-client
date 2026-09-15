"use client";

import { useState } from "react";
import {
  Input,
  Select,
  Label,
  ListBox,
} from "@heroui/react";
import JobListingContainer from "./JobListingContainer";

export default function JobFilters({ jobs }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const categories = [
    ...new Set(jobs.map((job) => job.category).filter(Boolean)),
  ];

  const types = [
    ...new Set(jobs.map((job) => job.type).filter(Boolean)),
  ];

  const filteredJobs = jobs.filter((job) => {
    const text = search.toLowerCase().trim();

    const searchMatch =
      !text ||
      job.title?.toLowerCase().includes(text) ||
      job.companyName?.toLowerCase().includes(text) ||
      job.location?.toLowerCase().includes(text);

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

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-[#111] p-4">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* Search */}
          <div className="min-w-0 lg:col-span-2">
            <Label className="mb-2 block text-sm text-white">
              Search Jobs
            </Label>

            <Input
              className="w-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        {/* Location */}
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

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-white/40">
            {filteredJobs.length} open positions
          </p>

          <button
            onClick={clearFilters}
            className="text-sm text-white/50 hover:text-white"
          >
            Clear filters
          </button>
        </div>

      </div>

      {/* Job List */}
      <JobListingContainer jobs={filteredJobs} />

    </div>
  );
}