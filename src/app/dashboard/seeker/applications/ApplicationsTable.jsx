import React from 'react';
import { Table } from '@heroui/react';
import {
    Briefcase,
    CircleCheck,
    CircleXmark,
    Clock,
    ArrowUpRight,
} from '@gravity-ui/icons';

const getStatus = (status) => {
    if (!status) return 'Applied';

    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

const getStatusIcon = (status) => {
    const value = status?.toLowerCase();

    if (
        value === 'accepted' ||
        value === 'approved' ||
        value === 'offered'
    ) {
        return (
            <CircleCheck
                width={15}
                height={15}
                className="text-success"
            />
        );
    }

    if (value === 'rejected') {
        return (
            <CircleXmark
                width={15}
                height={15}
                className="text-danger"
            />
        );
    }

    return (
        <Clock
            width={15}
            height={15}
            className="text-warning"
        />
    );
};

const getStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (
        value === 'accepted' ||
        value === 'approved' ||
        value === 'offered'
    ) {
        return 'border-success text-success';
    }

    if (value === 'rejected') {
        return 'border-danger text-danger';
    }

    if (
        value === 'review' ||
        value === 'reviewing' ||
        value === 'shortlisted'
    ) {
        return 'border-warning text-warning';
    }

    return 'border-default-400 text-default-200';
};

const getTimeAgo = (date) => {
    if (!date) return 'N/A';

    const created = new Date(date);
    const now = new Date();

    const seconds = Math.floor((now - created) / 1000);

    if (seconds < 60) return 'Just now';

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} ${
            minutes === 1 ? 'minute' : 'minutes'
        } ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks < 4) {
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }

    const years = Math.floor(days / 365);

    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};

const getJobType = (application) => {
    return (
        application.job?.type ||
        application.type ||
        application.jobType ||
        'Full-time'
    );
};

const getJobLocation = (application) => {
    return (
        application.job?.location ||
        application.location ||
        'Remote'
    );
};

export default function ApplicationsTable({ jobs = [] }) {
    if (jobs.length === 0) {
        return (
            <div className="rounded-xl border border-default-200 px-6 py-16 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-default-100">
                    <Briefcase
                        width={22}
                        height={22}
                        className="text-default-500"
                    />
                </div>

                <h3 className="text-base font-medium">
                    No applications yet
                </h3>

                <p className="mt-1 text-sm text-default-500">
                    You have not submitted any job applications.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-default-200">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="My job applications"
                        className="
                            [&_th]:h-14
                            [&_th]:border-b
                            [&_th]:border-default-200
                            [&_th]:px-6
                            [&_th]:text-sm
                            [&_th]:font-medium
                            [&_th]:text-default-600
                            [&_td]:border-b
                            [&_td]:border-default-100
                            [&_td]:px-6
                            [&_td]:py-4
                            [&_tr:last-child_td]:border-b-0
                        "
                    >
                        <Table.Header>
                            <Table.Column isRowHeader>
                                Job Title
                            </Table.Column>

                            <Table.Column>
                                Company
                            </Table.Column>

                            <Table.Column>
                                Applied
                            </Table.Column>

                            <Table.Column>
                                Status
                            </Table.Column>

                            <Table.Column>
                                Action
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {jobs.map((application) => (
                                <Table.Row key={application._id}>
                                    <Table.Cell>
                                        <div className="flex min-w-[250px] items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-default-100">
                                                <Briefcase
                                                    width={19}
                                                    height={19}
                                                    className="text-default-500"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">
                                                    {application.jobTitle ||
                                                        'Unknown Job'}
                                                </p>

                                                <p className="mt-0.5 text-xs text-default-500">
                                                    {getJobType(
                                                        application
                                                    )}{' '}
                                                    •{' '}
                                                    {getJobLocation(
                                                        application
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="whitespace-nowrap text-sm">
                                            {application.companyName ||
                                                'N/A'}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="whitespace-nowrap text-sm text-default-600">
                                            {getTimeAgo(
                                                application.createdAt
                                            )}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div
                                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusClass(
                                                application.status
                                            )}`}
                                        >
                                            {getStatusIcon(
                                                application.status
                                            )}

                                            <span>
                                                {getStatus(
                                                    application.status
                                                )}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
                                        >
                                            Details

                                            <ArrowUpRight
                                                width={14}
                                                height={14}
                                            />
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                <Table.Footer>
                    <div className="flex items-center justify-between px-6 py-3">
                        <span className="text-xs text-default-500">
                            Showing {jobs.length}{' '}
                            {jobs.length === 1
                                ? 'application'
                                : 'applications'}
                        </span>

                        <span className="text-xs text-default-500">
                            Total: {jobs.length}
                        </span>
                    </div>
                </Table.Footer>
            </Table>
        </div>
    );
};