import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Edit({
    auth,
    can,
    mustVerifyEmail,
    status,
    departments,
    work_centers,
}) {
    departments = departments.data.map((department) => {
        return {
            key: department.id ?? "",
            value: department.title ?? "",
        };
    });

    work_centers = work_centers.data.map((work_center) => {
        return {
            key: work_center.id ?? "",
            value: work_center.title ?? "",
        };
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">Profile</h2>
            }
        >
            <Head title="Profile" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    {can.profile_update && (
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                                departments={departments}
                                work_centers={work_centers}
                            />
                        </div>
                    )}

                    {can.profile_update && (
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    )}

                    {can.profile_delete && (
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
