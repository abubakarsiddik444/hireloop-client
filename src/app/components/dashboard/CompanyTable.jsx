"use client";

import { useState } from "react";
import { Table } from "@heroui/react";
import {
  CircleCheck,
  CircleXmark,
  Clock,
  Globe,
  MapPin,
  Persons,
  ChevronLeft,
  ChevronRight,
} from "@gravity-ui/icons";

const CompanyTable = ({ companies = [], handleApprove, handleReject }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination Calculations
  const totalPages = Math.ceil(companies.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = companies.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#191919]">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Companies approval table">
            <Table.Header className="bg-[#242424]">
              <Table.Column isRowHeader>Company</Table.Column>
              <Table.Column>Industry</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Employees</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Date Submitted</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {currentCompanies.map((company) => {
                const isApproved = company.status === "Approved";
                const isRejected = company.status === "Rejected";

                return (
                  <Table.Row
                    key={company._id?.toString()}
                    className="border-b border-[#252525] hover:bg-[#202020]"
                  >
                    {/* Company */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#303030] bg-[#222222]">
                          {company.logo ? (
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs font-semibold text-gray-400">
                              {company.name?.charAt(0)}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {company.name}
                          </p>

                          <a
                            href={`https://${company.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300"
                          >
                            <Globe className="h-3 w-3" />
                            {company.website}
                          </a>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Industry */}
                    <Table.Cell>
                      <span className="rounded-full bg-[#252525] px-2.5 py-1 text-xs text-gray-400">
                        {company.industry}
                      </span>
                    </Table.Cell>

                    {/* Location */}
                    <Table.Cell>
                      <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <MapPin className="h-3.5 w-3.5" />
                        {company.location}
                      </div>
                    </Table.Cell>

                    {/* Employees */}
                    <Table.Cell>
                      <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <Persons className="h-3.5 w-3.5" />
                        {company.employees}
                      </div>
                    </Table.Cell>

                    {/* Status */}
                    <Table.Cell>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          isApproved
                            ? "text-emerald-400"
                            : isRejected
                              ? "text-red-400"
                              : "text-amber-400"
                        }`}
                      >
                        {isApproved ? (
                          <CircleCheck className="h-3.5 w-3.5" />
                        ) : isRejected ? (
                          <CircleXmark className="h-3.5 w-3.5" />
                        ) : (
                          <Clock className="h-3.5 w-3.5" />
                        )}

                        {company.status}
                      </span>
                    </Table.Cell>

                    {/* Date */}
                    <Table.Cell>
                      <span className="text-sm text-gray-400">
                        {company.createdAt
                          ? new Date(company.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "—"}
                      </span>
                    </Table.Cell>

                    {/* Actions */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {!isApproved && (
                          <button
                            type="button"
                            onClick={() => handleApprove && handleApprove(company._id)}
                            className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                          >
                            Approve
                          </button>
                        )}

                        {!isRejected && (
                          <button
                            type="button"
                            onClick={() => handleReject && handleReject(company._id)}
                            className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <div className="flex items-center justify-between border-t border-[#252525] px-5 py-3">
            {/* Left side text */}
            <span className="text-xs text-gray-400">
              Showing{" "}
              <strong className="text-white">
                {companies.length === 0 ? 0 : startIndex + 1}-
                {Math.min(endIndex, companies.length)}
              </strong>{" "}
              of <strong className="text-white">{companies.length}</strong> companies
            </span>

            {/* Right side Pagination Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#303030] bg-[#222222] text-gray-400 transition hover:bg-[#2e2e2e] hover:text-white disabled:opacity-40 disabled:hover:bg-[#222222]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = currentPage === pageNumber;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition ${
                      isActive
                        ? "bg-white text-black font-semibold"
                        : "border border-[#303030] bg-[#222222] text-gray-400 hover:bg-[#2e2e2e] hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#303030] bg-[#222222] text-gray-400 transition hover:bg-[#2e2e2e] hover:text-white disabled:opacity-40 disabled:hover:bg-[#222222]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default CompanyTable;