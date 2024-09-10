import ModalConfirm from "@/Components/ModalConfirm";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ auth, can, roles }) {
    // DELETE ROLE
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openDeleteConfirm = (id) => {
        setSelectedRoleId(id);
        setIsOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                Roles List
                            </h2>

                            <p className="mt-1 text-sm">
                                A list of all the Roles.
                            </p>
                        </div>
                        <div>
                            {can.role_create && (
                                <Link href={route("roles.create")}>
                                    <PrimaryButton>Create new</PrimaryButton>
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Roles" />

            <ModalConfirm
                isOpen={isOpen}
                closeModal={closeModal}
                id={selectedRoleId}
                message={
                    "Once this role is deleted, all of its resources and related relation will be permanently deleted."
                }
                method={"delete"}
                url={"roles.destroy"}
            />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <div className="overflow-x-auto max-w-xl">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.data.map((role) => {
                                        return (
                                            <tr
                                                className="border-b-base-300"
                                                key={role.id}
                                            >
                                                <td>{role.id}</td>
                                                <td>{role.title}</td>
                                                <td className="text-center text-blue-500">
                                                    {can.role_edit && (
                                                        <Link
                                                            href={route(
                                                                "roles.edit",
                                                                role.id
                                                            )}
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                </td>
                                                <td className="text-center text-red-500">
                                                    {can.role_delete && (
                                                        <div
                                                            onClick={() => {
                                                                openDeleteConfirm(
                                                                    role.id
                                                                );
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            Delete
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {roles.meta.links.length > 3 && (
                        <Pagination meta={roles.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
