"use client";

import { Table, Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TrashBin, Pencil, Eye } from "@gravity-ui/icons";
import toast from "react-hot-toast";


export default function RecruiterJobs() {
    const companyId = "company_123";

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/jobs?companyId=${companyId}`
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to load jobs");
                }

                setJobs(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load jobs");
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(
                `http://localhost:5000/api/jobs/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Delete failed");
            }

            setJobs((prev) => prev.filter((job) => job._id !== id));

            toast.success("Job deleted successfully!");
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to delete job");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#111112] p-5 text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="text-gray-400">Loading jobs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111112] p-5 text-white">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Manage All Jobs
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Manage your company job postings
                        </p>
                    </div>

                    <Link href="/dashboard/recruiter/jobs/new">
                        <Button className="rounded-md bg-white px-4 text-sm font-medium text-black">
                            + Post Job
                        </Button>
                    </Link>
                </div>

                {/* No Jobs */}
                {jobs.length === 0 ? (
                    <div className="rounded-lg border border-white/10 bg-[#151516] p-10 text-center">
                        <p className="text-gray-400">
                            No jobs found
                        </p>
                    </div>
                ) : (
                    /* Jobs Table */
                    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#151516]">
                        <Table>
                            <Table.ScrollContainer>
                                <Table.Content
                                    aria-label="Company jobs"
                                    className="min-w-[1200px]"
                                >
                                    <Table.Header>
                                        <Table.Column isRowHeader>
                                            Job Title
                                        </Table.Column>

                                        <Table.Column>
                                            Category
                                        </Table.Column>

                                        <Table.Column>
                                            Type
                                        </Table.Column>

                                        <Table.Column>
                                            Salary
                                        </Table.Column>

                                        <Table.Column>
                                            Location
                                        </Table.Column>

                                        <Table.Column>
                                            Deadline
                                        </Table.Column>

                                        <Table.Column>
                                            Status
                                        </Table.Column>

                                        <Table.Column>
                                            Actions
                                        </Table.Column>
                                    </Table.Header>

                                    <Table.Body>
                                        {jobs.map((job) => (
                                            <Table.Row key={job._id}>

                                                <Table.Cell>
                                                    <span className="font-medium">
                                                        {job.title}
                                                    </span>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    {job.category}
                                                </Table.Cell>

                                                <Table.Cell>
                                                    {job.type}
                                                </Table.Cell>

                                                <Table.Cell>
                                                    {job.min} - {job.max}{" "}
                                                    {job.currency}
                                                </Table.Cell>

                                                <Table.Cell>
                                                    {job.remote
                                                        ? "Remote"
                                                        : job.location}
                                                </Table.Cell>

                                                <Table.Cell>
                                                    {job.deadline}
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs ${
                                                            job.status === "active"
                                                                ? "bg-green-500/10 text-green-400"
                                                                : "bg-gray-500/10 text-gray-400"
                                                        }`}
                                                    >
                                                        {job.status}
                                                    </span>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <div className="flex items-center gap-2">

                                                        {/* View */}
                                                        <Link
                                                            href={`/dashboard/recruiter/jobs/${job._id}`}
                                                        >
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="secondary"
                                                                className="border border-white/10 bg-transparent text-gray-300"
                                                                title="View Details"
                                                            >
                                                                <Eye size={16} />
                                                            </Button>
                                                        </Link>

                                                        {/* Edit */}
                                                        <Link
                                                            href={`/dashboard/recruiter/jobs/${job._id}/edit`}
                                                        >
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="secondary"
                                                                className="border border-white/10 bg-transparent text-gray-300"
                                                                title="Edit Job"
                                                            >
                                                                <Pencil size={16} />
                                                            </Button>
                                                        </Link>

                                                        {/* Delete */}
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="secondary"
                                                            onPress={() =>
                                                                handleDelete(
                                                                    job._id
                                                                )
                                                            }
                                                            className="border border-red-500/20 bg-transparent text-red-400"
                                                            title="Delete Job"
                                                        >
                                                            <TrashBin size={16} />
                                                        </Button>

                                                    </div>
                                                </Table.Cell>

                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}