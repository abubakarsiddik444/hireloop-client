"use client";

import { useMemo, useState } from "react";
import { Table, Button, Modal } from "@heroui/react";
import {
  Person,
  Briefcase,
  CircleCheck,
  CircleXmark,
  TrashBin,
  ChevronLeft,
  ChevronRight,
  Shield, // Admin icon
} from "@gravity-ui/icons";
import { updateUserRole } from "@/lib/actions/users";

const AdminUsersTable = ({ users = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingUserId, setLoadingUserId] = useState(null);

  // Confirmation dialog
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const usersPerPage = 10;

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.ceil(users.length / usersPerPage);

  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return users.slice(startIndex, endIndex);
  }, [users, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // =========================
  // User Initials
  // =========================
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // =========================
  // Open Role Confirmation
  // =========================
  const openRoleConfirmation = (userId, currentRole, targetRole, userName) => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    // Role যদি একই হয়, তবে modal খুলবে না
    if (currentRole?.toLowerCase() === targetRole?.toLowerCase()) {
      return;
    }

    setSelectedUser({
      userId,
      currentRole: currentRole?.toLowerCase() || "seeker",
      newRole: targetRole,
      userName,
    });

    setIsRoleModalOpen(true);
  };

  // =========================
  // Close Role Confirmation
  // =========================
  const closeRoleConfirmation = () => {
    if (loadingUserId) return;
    setIsRoleModalOpen(false);
    setSelectedUser(null);
  };

  // =========================
  // Update User Role
  // =========================
  const handleRoleChange = async () => {
    if (!selectedUser?.userId) {
      console.error("User ID not found");
      return;
    }

    const { userId, newRole } = selectedUser;

    try {
      setLoadingUserId(userId);

      const data = await updateUserRole(userId, newRole);

      if (data?.modifiedCount) {
        console.log("Role updated successfully");
      }

      setIsRoleModalOpen(false);
      setSelectedUser(null);

      // Server page refresh
      window.location.reload();
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  // =========================
  // Showing Count
  // =========================
  const startUser =
    users.length === 0 ? 0 : (currentPage - 1) * usersPerPage + 1;
  const endUser = Math.min(currentPage * usersPerPage, users.length);

  return (
    <>
      {/* TOTAL USERS */}
      <div className="mb-5 flex items-center justify-between rounded-xl border border-[#303030] bg-[#191919] px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Total Users
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white">{users.length}</h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
          <Person className="h-5 w-5 text-purple-400" />
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="w-full overflow-hidden rounded-xl border border-[#303030] bg-[#191919]">
        <Table className="w-full">
          <Table.ScrollContainer>
            <Table.Content aria-label="Users table">
              {/* Header */}
              <Table.Header>
                <Table.Column isRowHeader>User Name</Table.Column>
                <Table.Column>Email Address</Table.Column>
                <Table.Column>Role</Table.Column>
                <Table.Column>Join Date</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>

              {/* Body */}
              <Table.Body>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => {
                    const userId = user?._id || user?.id || user?.userId;
                    const role = user?.role?.toLowerCase() || "seeker";

                    const isAdmin = role === "admin";
                    const isRecruiter = role === "recruiter";
                    const isSeeker = role === "seeker";

                    const isSuspended =
                      user?.status?.toLowerCase() === "suspended";
                    const isLoading = loadingUserId === userId;

                    const userName =
                      user?.name || user?.displayName || user?.email || "this user";

                    return (
                      <Table.Row key={userId || `${user?.email || "user"}-${index}`}>
                        {/* User */}
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            {user?.photoURL || user?.image ? (
                              <img
                                src={user.photoURL || user.image}
                                alt={userName}
                                className="h-8 w-8 shrink-0 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#303030] text-xs font-medium text-gray-300">
                                {getInitials(userName)}
                              </div>
                            )}

                            <span className="whitespace-nowrap text-sm text-gray-200">
                              {userName}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Email */}
                        <Table.Cell>
                          <span className="whitespace-nowrap text-sm text-gray-400">
                            {user?.email || "N/A"}
                          </span>
                        </Table.Cell>

                        {/* Role */}
                        <Table.Cell>
                          <div
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                              isAdmin
                                ? "border-purple-500/30 bg-purple-500/10 text-purple-400"
                                : isRecruiter
                                ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                                : "border-[#4a4a4a] bg-[#303030] text-gray-300"
                            }`}
                          >
                            {isAdmin ? (
                              <Shield className="h-3 w-3" />
                            ) : isRecruiter ? (
                              <Briefcase className="h-3 w-3" />
                            ) : (
                              <Person className="h-3 w-3" />
                            )}

                            <span className="capitalize">{role}</span>
                          </div>
                        </Table.Cell>

                        {/* Join Date */}
                        <Table.Cell>
                          <span className="whitespace-nowrap text-sm text-gray-400">
                            {user?.createdAt
                              ? new Date(user.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                  }
                                )
                              : "N/A"}
                          </span>
                        </Table.Cell>

                        {/* Status */}
                        <Table.Cell>
                          <div
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                              isSuspended
                                ? "border-red-500/30 bg-red-500/5 text-red-400"
                                : "border-green-500/30 bg-green-500/5 text-green-400"
                            }`}
                          >
                            {isSuspended ? (
                              <CircleXmark className="h-3 w-3" />
                            ) : (
                              <CircleCheck className="h-3 w-3" />
                            )}

                            <span className="capitalize">
                              {user?.status || "Active"}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Actions */}
                        <Table.Cell>
                          <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                            {/* Make Admin Button */}
                            {!isAdmin && (
                              <Button
                                size="sm"
                                variant="ghost"
                                isDisabled={!userId || isLoading}
                                onPress={() =>
                                  openRoleConfirmation(
                                    userId,
                                    user?.role,
                                    "admin",
                                    userName
                                  )
                                }
                                className="min-w-0 px-2 text-xs text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                              >
                                Make Admin
                              </Button>
                            )}

                            {/* Toggle Seeker/Recruiter Button */}
                            <Button
                              size="sm"
                              variant="ghost"
                              isDisabled={!userId || isLoading}
                              onPress={() =>
                                openRoleConfirmation(
                                  userId,
                                  user?.role,
                                  isRecruiter ? "seeker" : "recruiter",
                                  userName
                                )
                              }
                              className="min-w-0 px-2 text-xs text-gray-300 hover:text-white"
                            >
                              {isLoading
                                ? "Updating..."
                                : isRecruiter
                                ? "Make Seeker"
                                : "Make Recruiter"}
                            </Button>

                            {/* Suspend / Activate */}
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`min-w-0 px-2 text-xs ${
                                isSuspended
                                  ? "text-green-400 hover:text-green-300"
                                  : "text-red-400 hover:text-red-300"
                              }`}
                            >
                              {isSuspended ? "Activate" : "Suspend"}
                            </Button>

                            {/* Delete */}
                            <Button
                              isIconOnly
                              size="sm"
                              variant="ghost"
                              aria-label="Delete user"
                              className="text-gray-500 hover:text-red-400"
                            >
                              <TrashBin className="h-4 w-4" />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                ) : (
                  <Table.Row>
                    <Table.Cell
                      colSpan={6}
                      className="py-12 text-center text-gray-500"
                    >
                      No users found
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          {/* Footer */}
          <Table.Footer>
            <div className="flex w-full items-center justify-between border-t border-[#303030] px-4 py-3">
              <p className="text-xs text-gray-500">
                Showing {startUser} to {endUser} of {users.length} users
              </p>

              {totalPages > 0 && (
                <div className="flex items-center gap-1">
                  {/* Previous */}
                  <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    aria-label="Previous page"
                    onPress={handlePrevious}
                    isDisabled={currentPage === 1}
                    className="text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {/* Pages */}
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <Button
                      key={page}
                      isIconOnly
                      size="sm"
                      variant={currentPage === page ? "solid" : "ghost"}
                      aria-label={`Page ${page}`}
                      onPress={() => handlePageChange(page)}
                      className={
                        currentPage === page
                          ? "bg-white text-black"
                          : "text-gray-400 hover:text-white"
                      }
                    >
                      {page}
                    </Button>
                  ))}

                  {/* Next */}
                  <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    aria-label="Next page"
                    onPress={handleNext}
                    isDisabled={currentPage === totalPages}
                    className="text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </Table.Footer>
        </Table>
      </div>

      {/* ROLE CONFIRMATION MODAL */}
      <Modal>
        <Modal.Backdrop
          isOpen={isRoleModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              closeRoleConfirmation();
            }
          }}
          className="bg-black/70 backdrop-blur-sm"
        >
          <Modal.Container placement="center" className="max-w-md">
            <Modal.Dialog className="border border-[#303030] bg-[#191919] shadow-2xl">
              {/* Modal Header */}
              <Modal.Header className="border-b border-[#303030] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                    <Shield className="h-5 w-5" />
                  </div>

                  <div>
                    <Modal.Heading className="text-base font-semibold text-white">
                      Change User Role
                    </Modal.Heading>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Please confirm this action
                    </p>
                  </div>
                </div>
              </Modal.Header>

              {/* Modal Body */}
              <Modal.Body className="px-6 py-6">
                <p className="text-sm leading-6 text-gray-300">
                  Are you sure you want to change{" "}
                  <span className="font-semibold text-white">
                    {selectedUser?.userName}
                  </span>{" "}
                  from{" "}
                  <span className="font-semibold capitalize text-gray-400">
                    {selectedUser?.currentRole}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold capitalize text-purple-400">
                    {selectedUser?.newRole}
                  </span>
                  ?
                </p>

                <div className="mt-4 rounded-lg border border-purple-500/20 bg-purple-500/5 px-4 py-3">
                  <p className="text-xs leading-5 text-purple-300">
                    This will change the users role and grant or restrict access
                    to administrative features and dashboard settings.
                  </p>
                </div>
              </Modal.Body>

              {/* Modal Footer */}
              <Modal.Footer className="border-t border-[#303030] px-6 py-4">
                <Button
                  variant="ghost"
                  onPress={closeRoleConfirmation}
                  isDisabled={!!loadingUserId}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  onPress={handleRoleChange}
                  isDisabled={!!loadingUserId}
                  className="bg-purple-500 text-white hover:bg-purple-600"
                >
                  {loadingUserId ? "Updating..." : "Confirm Change"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default AdminUsersTable;