import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import ApplicationsTable from './ApplicationsTable';

const page = async () => {
    const user = await getUserSession();

    const jobs =
        (await getApplicationsByApplicant(user.id)) ?? [];

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    My Applications
                </h1>

                <p className="mt-1 text-sm text-default-500">
                    Track your job applications and their current status.
                </p>
            </div>

            <ApplicationsTable jobs={jobs} />
        </div>
    );
};

export default page;