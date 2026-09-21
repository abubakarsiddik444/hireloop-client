import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { Table } from '@heroui/react';
import {
    Briefcase,
    Calendar,
    CircleCheck,
    CircleXmark,
    Clock,
} from '@gravity-ui/icons';

const getStatusIcon = (status) => {
    const value = status?.toLowerCase();

    if (value === 'accepted' || value === 'approved') {
        return <CircleCheck className="text-success" width={18} height={18} />;
    }

    if (value === 'rejected') {
        return <CircleXmark className="text-danger" width={18} height={18} />;
    }

    return <Clock className="text-warning" width={18} height={18} />;
};

const page = async () => {
    const user = await getUserSession();
    const jobs = (await getApplicationsByApplicant(user.id)) ?? [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Briefcase
                            width={22}
                            height={22}
                            className="text-primary"
                        />
                    </div>

                    <h2 className="text-2xl font-bold">My Applications</h2>
                </div>

                <p className="text-default-500">
                    You have submitted {jobs.length} application
                    {jobs.length !== 1 ? 's' : ''}.
                </p>
            </div>

            {/* Empty state (table er baire) */}
            {jobs.length === 0 ? (
                <div className="rounded-xl border border-default-200 py-16 text-center text-default-500 shadow-sm">
                    No applications found.
                </div>
            ) : (
                <div className="rounded-xl border border-default-200 shadow-sm">
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content aria-label="My job applications">
                                <Table.Header>
                                    <Table.Column isRowHeader>JOB</Table.Column>
                                    <Table.Column>COMPANY</Table.Column>
                                    <Table.Column>TYPE</Table.Column>
                                    <Table.Column>LOCATION</Table.Column>
                                    <Table.Column>APPLIED DATE</Table.Column>
                                    <Table.Column>STATUS</Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {jobs.map((application) => (
                                        <Table.Row key={application._id}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Briefcase
                                                            width={18}
                                                            height={18}
                                                            className="text-primary"
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold">
                                                            {application.job?.title ||
                                                                application.title ||
                                                                'Unknown Job'}
                                                        </p>

                                                        <p className="text-xs text-default-400">
                                                            Job ID:{' '}
                                                            {application.jobId ||
                                                                application.job?._id ||
                                                                'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                {application.job?.company ||
                                                    application.company ||
                                                    'N/A'}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <span className="capitalize">
                                                    {application.job?.type ||
                                                        application.type ||
                                                        'N/A'}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell>
                                                {application.job?.location ||
                                                    application.location ||
                                                    'N/A'}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar
                                                        width={16}
                                                        height={16}
                                                        className="text-default-400"
                                                    />

                                                    {application.createdAt
                                                        ? new Date(
                                                              application.createdAt
                                                          ).toLocaleDateString()
                                                        : 'N/A'}
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(
                                                        application.status
                                                    )}

                                                    <span className="capitalize font-medium">
                                                        {application.status ||
                                                            'Pending'}
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>

                        <Table.Footer>
                            <div className="px-4 py-3 text-sm text-default-500">
                                Total Applications: {jobs.length}
                            </div>
                        </Table.Footer>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default page;