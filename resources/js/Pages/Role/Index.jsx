import InputLabel from "@/Components/InputLabel";
import ModalConfirm from "@/Components/ModalConfirm";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
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
                        {/* <h2 className="font-semibold text-xl leading-tight">
                            Roles List
                        </h2>
                        <p className="mt-2 text-sm">A list of all the users.</p> */}
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
                                                    {/* <button className="btn btn-ghost">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="size-5"
                                                        >
                                                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                                        </svg>
                                                    </button> */}
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
                                                    {/* <button
                                                        onClick={() => {
                                                            openDeleteConfirm(
                                                                role.id
                                                            );
                                                        }}
                                                        className="btn btn-ghost"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="size-5"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button> */}
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
